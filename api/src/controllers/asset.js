const { getCurrentFestival } = require("./festival");

const dbError = require("../utils/dbError");
const {
  Asset,
  Festival,
  AssetCategory,
  AstNFTCard,
  TokenCoupon,
  Voucher,
  Wallet,
  Template,
  Car,
  CarOwner,
  Sponsor,
  VoteCategory,
  User,
  Vendor,
} = require("../db.js");
const {
  createTokenTransaction,
  createAssetTransaction,
} = require("./transaction.js");
const dbSuccess = require("../utils/dbSuccess");

/////// ASSET /////////////////

async function getAssets() {
  try {
    const assets = await Asset.findAll({
      where: { isListed: true },
      include: [TokenCoupon, AssetCategory, AstNFTCard, Voucher],
    });
    return !assets || assets.length === 0
      ? dbError(`No assets found for wallet ${walletId}`, 404)
      : assets;
  } catch (err) {
    return err;
  }
}
async function getAssetsByWallet(walletId) {
  try {
    const assets = await Asset.findAll({
      where: { walletId },
      include: [TokenCoupon, AssetCategory, AstNFTCard, Voucher],
    });
    return !assets || assets.length === 0
      ? dbError(`No assets found for wallet ${walletId}`, 404)
      : assets;
  } catch (err) {
    return err;
  }
}
async function getAllAssetCategory() {
  try {
    const response = await AssetCategory.findAll();
    return !response.length
      ? dbError(`No Assets Categories found. Create some.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function getNFTCards() {
  try {
    const { id } = await AssetCategory.findOne({
      where: { table: "AstNFTCard" },
    });
    const assets = await Asset.findAll({
      where: { categoryId: id },
      include: AstNFTCard,
    });
    const assetsWithCollections = assets.map(async (asset) => {
      const templateId = asset.astNFTCard.templateId;
      const { festivalId } = await Template.findByPk(templateId);
      const collection = await Festival.findByPk(festivalId);
      return { asset, collection };
    });
    const response = Promise.all(assetsWithCollections).then((res) => res);
    return response;
    return !response.length
      ? dbError(`No Assets Categories found. Create some.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function getAssetById(req) {
  try {
    const { assetId } = req.params;
    const asset = await Asset.findByPk(assetId);
    const wallet = await Wallet.findByPk(asset.walletId, { include: User });
    const { user: seller } = wallet;
    const assetCategory = await AssetCategory.findByPk(asset.categoryId);
    let assetData = {};
    if (assetCategory.table === "AstNFTCard") {
      assetData = await AstNFTCard.findOne({
        where: { assetId: asset.id },
      });
    }
    if (assetCategory.table === "Voucher") {
      assetData = await Voucher.findOne({
        where: { assetId: asset.id },
        include: Vendor,
      });
    }
    const template = await Template.findByPk(assetData.templateId);
    const festival = await Festival.findByPk(template.festivalId);
    return { asset, assetData, assetCategory, seller, festival };
    return !response.length
      ? dbError(`No Assets Categories found. Create some.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function editAssetById(req) {
  try {
    const { assetId } = req.params;
    // body= {isListed, price}
    await Asset.update(
      {
        isListed: req.body.isListed,
      },
      { where: { id: assetId } }
    );
    const asset = await Asset.findByPk(assetId);
    const assetCategory = await AssetCategory.findByPk(asset.categoryId);

    if (assetCategory.table === "AstNFTCard") {
      await AstNFTCard.update(
        {
          price: req.body.price,
        },
        { where: { assetId: assetId } }
      );
    }
    if (assetCategory.table === "Voucher") {
      await Voucher.update(
        {
          price: req.body.price,
        },
        { where: { assetId: assetId } }
      );
    }
    return dbSuccess(
      `Asset ${assetId} was updated successfully`,
      { confirm: true },
      200
    );
  } catch (err) {
    return err;
  }
}
async function getNFTCard(req) {
  try {
    const { nftCardId } = req.params;
    const nftCard = await AstNFTCard.findOne({
      where: { assetId: nftCardId },
      // include: Car,
    });
    // // owner
    // const ownerId = nftCard.car.carOwnerId;
    // const owner = await CarOwner.findByPk(ownerId);
    // nftCard.owner = owner;
    const { carId } = nftCard;
    const car = await Car.findOne({
      where: { id: carId },
      include: [CarOwner, Sponsor, VoteCategory],
    });

    // nftCard.myCar = car;

    const response = { nftCard, car };
    return Object.keys(response).length === 0
      ? dbError(`No Assets Categories found. Create some.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function getVoucher(req) {
  try {
    const { voucherId } = req.params;
    const response = await Voucher.findOne({
      where: { assetId: voucherId },
      include: Vendor,
    });

    return Object.keys(response).length === 0
      ? dbError(`No Voucher found.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function createAssetCategory(data) {
  try {
    const newCategory = await AssetCategory.create({
      title: data.title,
      table: data.table,
    });
    return newCategory;
  } catch (err) {
    return err;
  }
}
async function getVouchers(req) {
  try {
    const { id } = await AssetCategory.findOne({
      where: { table: "Voucher" },
    });
    const response = await Asset.findAll({
      where: { categoryId: id },
      include: Voucher,
    });

    return !response.length
      ? dbError(`No Assets Categories found. Create some.`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function createAssetCategory(data) {
  try {
    const newCategory = await AssetCategory.create({
      title: data.title,
      table: data.table,
    });
    return newCategory;
  } catch (err) {
    return err;
  }
}
async function buyAsset({ assetId, walletId }) {
  try {
    // 1. SEND TOKENS TO ASSET OWNER
    // Get asset for toWalletId
    const asset = await Asset.findOne({
      where: { id: assetId },
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetId} not found`);
    const table = asset.assetCategory.table;
    // Get asset details for price
    let assetDetails;
    if (table === "AstNFTCard") {
      assetDetails = await AstNFTCard.findOne({
        where: { assetId: assetId },
      });
    }
    if (table === "Voucher") {
      assetDetails = await Voucher.findOne({
        where: { assetId },
      });
    }
    // Send tokens
    const newTokenTransaction = await createTokenTransaction({
      fromWalletId: walletId,
      toWalletId: asset.walletId,
      amount: assetDetails.price,
    });
    if (!!newTokenTransaction.error) return newTokenTransaction;

    // 2. SEND ASSET
    const newAssetTransaction = await createAssetTransaction({
      fromWalletId: asset.walletId,
      toWalletId: walletId,
      assetId,
    });

    return { token: newTokenTransaction, asset: newAssetTransaction };
  } catch (err) {
    return err;
  }
}

async function createNFTCard(data) {
  try {
    const wallet = await Wallet.findByPk(data.params.walletId);
    if (!wallet)
      return dbError(`walletId ${data.params.walletId} not found`, 404);
    const festival = await getCurrentFestival();
    const template = await Template.create({
      festivalId: festival.id,
      walletId: wallet.id,
    });

    const assetsCreated = [];
    const assetCategory = await AssetCategory.findOne({
      where: { table: "AstNFTCard" },
    });
    if (!assetCategory)
      return dbError(`NFT Card category not found. Create category first`, 404);
    for (let i = 1; i <= data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryId: assetCategory.id,
        isListed: true,
        walletId: data.params.walletId,
      });
      const newNFTCard = await AstNFTCard.create({
        assetId: newAsset.id,
        name: data.body.name,
        mintNum: i,
        mintTotal: data.params.quantity,
        mintMax: data.params.quantity,
        templateId: template.id,
        imageFront: data.files[0].path,
        imageBack: data.files[1].path,
        price: data.body.price,
        burnable: data.body.burnable,
        transferable: data.body.transferable,
      });
      assetsCreated.push(newNFTCard);
    }
    const response = assetsCreated;
    return !response.length ? dbError(`No NFT Cards created`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createVoucher(data) {
  try {
    const wallet = await Wallet.findByPk(data.params.walletId);
    if (!wallet)
      return dbError(`walletId ${data.params.walletId} not found`, 404);
    const festival = await getCurrentFestival();
    const template = await Template.create({
      festivalId: festival.id,
      walletId: wallet.id,
    });

    const assetCategory = await AssetCategory.findOne({
      where: { table: "Voucher" },
    });
    if (!assetCategory)
      return dbError(
        `Voucher asset category not found. Create category first`,
        404
      );

    const assetsCreated = [];
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryId: assetCategory.id,
        isListed: true,
        walletId: data.params.walletId,
      });
      const newVoucher = await Voucher.create({
        assetId: newAsset.id,
        name: data.body.name,
        templateId: template.id,
        image: data.file.path,
        burnable: data.body.burnable,
        transferable: data.body.transferable,
        expires: data.body.expires,
        price: data.body.price,
      });
      assetsCreated.push(newVoucher);
    }
    const response = assetsCreated;
    return !response.length ? dbError(`No Vouchers created`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createTokenCoupon(data) {
  try {
    const wallet = await Wallet.findByPk(data.params.walletId);
    if (!wallet)
      return dbError(`walletId ${data.params.walletId} not found`, 404);
    const festival = await getCurrentFestival();
    const tokensCreated = [];
    const tokenCouponCategory = await AssetCategory.findOne({
      where: { table: "TokenCoupon" },
    });
    if (!tokenCouponCategory)
      return dbError(
        `Token Coupon category not found. Create category first`,
        404
      );
    if (parseInt(data.body.amount) <= 0)
      return dbError(`Amount must be greater than 0`, 401);
    //create
    const template = await Template.create({
      festivalId: festival.id,
      walletId: wallet.id,
    });
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryId: tokenCouponCategory.id,
        isListed: false,
        walletId: data.params.walletId,
      });
      const newToken = await TokenCoupon.create({
        assetId: newAsset.id,
        name: data.body.name,
        templateId: template.id,
        image: data.file.path,
        tokenAmount: parseInt(data.body.amount),
        isBurnt: false,
        expires: data.body.expires.toUpperCase() === "TRUE" ? true : false,
      });
      tokensCreated.push(newToken);
    }
    const response = tokensCreated;
    return !response.length
      ? dbError(`No Token Coupons created`, 404)
      : response;
  } catch (err) {
    return err;
  }
}

async function createVoucherCoupon(data) {
  // Do I need a Coupon Voucher table? Isn´t just a send/receive transfer asset action?
  try {
    const wallet = await Wallet.findByPk(data.params.walletId);
    if (!wallet)
      return dbError(`walletId ${data.params.walletId} not found`, 404);
    const festival = await getCurrentFestival();
    const vouchersCreated = [];
    const voucherCouponCategory = await AssetCategory.findOne({
      where: { table: "VoucherCoupon" },
    });
    if (!voucherCouponCategory)
      return dbError(
        `Voucher Coupon category not found. Create category first`,
        404
      );
    //create
    const template = await Template.create({
      festivalId: festival.id,
      walletId: wallet.id,
    });
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryId: tokenCouponCategory.id,
        isListed: false,
        walletId: data.params.walletId,
      });
      const newVoucherCoupon = await VoucherCoupon.create({
        assetId: newAsset.id,
        name: data.body.name,
        templateId: template.id,
        image: data.file.path,
        voucherID: data.body.voucherID,
        isBurnt: false,
        expires: data.body.expires.toUpperCase() === "TRUE" ? true : false,
      });
      vouchersCreated.push(newVoucherCoupon);
    }
    const response = vouchersCreated;
    return !response.length
      ? dbError(`No Voucher Coupons created`, 404)
      : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createTokenCoupon,
  createVoucherCoupon,
  createAssetCategory,
  createNFTCard,
  buyAsset,
  getAssets,
  getAssetById,
  editAssetById,
  getAssetsByWallet,
  getAllAssetCategory,
  createVoucher,
  getNFTCards,
  getNFTCard,
  getVouchers,
  getVoucher,
};
