const { getCurrentFestival } = require("./festival");

const dbError = require("../utils/dbError");
const {
  Asset,
  AssetCategory,
  AstNFTCard,
  TokenCoupon,
  Voucher,
  Wallet,
  Template,
} = require("../db.js");
const {
  createTokenTransaction,
  createAssetTransaction,
} = require("./transaction.js");

/////// ASSET /////////////////

async function getAssets(walletID) {
  try {
    const assets = await Asset.findAll({
      where: { walletID },
      include: [TokenCoupon, AssetCategory, AstNFTCard],
    });
    return !assets || assets.length === 0
      ? dbError(`No assets found for wallet ${walletID}`, 404)
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
async function buyAsset({ assetID, walletID }) {
  try {
    // 1. SEND TOKENS TO ASSET OWNER
    // Get asset for toWalletID
    const asset = await Asset.findOne({
      where: { id: assetID },
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetID} not found`);
    const table = asset.assetCategory.table;
    // Get asset details for price
    let assetDetails;
    if (table === "AstNFTCard") {
      assetDetails = await AstNFTCard.findOne({
        where: { assetID: assetID },
      });
    }
    if (table === "Voucher") {
      assetDetails = await Voucher.findOne({
        where: { assetID },
      });
    }
    // Send tokens
    const newTokenTransaction = await createTokenTransaction({
      fromWalletID: walletID,
      toWalletID: asset.walletID,
      amount: assetDetails.price,
    });

    // 2. SEND ASSET
    const newAssetTransaction = await createAssetTransaction({
      fromWalletID: asset.walletID,
      toWalletID: walletID,
      assetID,
    });

    return { token: newTokenTransaction, asset: newAssetTransaction };
  } catch (err) {
    return err;
  }
}

async function createNFTCard(data) {
  try {
    const wallet = await Wallet.findByPk(data.params.walletID);
    if (!wallet)
      return dbError(`WalletID ${data.params.walletID} not found`, 404);
    const festival = await getCurrentFestival();
    const template = await Template.create({
      festivalID: festival.id,
      walletID: wallet.id,
    });

    const assetsCreated = [];
    const assetCategory = await AssetCategory.findOne({
      where: { table: "AstNFTCard" },
    });
    if (!assetCategory)
      return dbError(`NFT Card category not found. Create category first`, 404);
    for (let i = 1; i <= data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryID: assetCategory.id,
        isListed: true,
        walletID: data.params.walletID,
      });
      const newNFTCard = await AstNFTCard.create({
        assetID: newAsset.id,
        name: data.body.name,
        mintNum: i,
        mintTotal: data.params.quantity,
        mintMax: data.params.quantity,
        templateID: template.id,
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
    const wallet = await Wallet.findByPk(data.params.walletID);
    if (!wallet)
      return dbError(`WalletID ${data.params.walletID} not found`, 404);
    const festival = await getCurrentFestival();
    const template = await Template.create({
      festivalID: festival.id,
      walletID: wallet.id,
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
        categoryID: assetCategory.id,
        isListed: true,
        walletID: data.params.walletID,
      });
      const newVoucher = await Voucher.create({
        assetID: newAsset.id,
        name: data.body.name,
        templateID: template.id,
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
    const wallet = await Wallet.findByPk(data.params.walletID);
    if (!wallet)
      return dbError(`WalletID ${data.params.walletID} not found`, 404);
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
      festivalID: festival.id,
      walletID: wallet.id,
    });
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryID: tokenCouponCategory.id,
        isListed: false,
        walletID: data.params.walletID,
      });
      const newToken = await TokenCoupon.create({
        assetID: newAsset.id,
        name: data.body.name,
        templateID: template.id,
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
    const wallet = await Wallet.findByPk(data.params.walletID);
    if (!wallet)
      return dbError(`WalletID ${data.params.walletID} not found`, 404);
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
      festivalID: festival.id,
      walletID: wallet.id,
    });
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryID: tokenCouponCategory.id,
        isListed: false,
        walletID: data.params.walletID,
      });
      const newVoucherCoupon = await VoucherCoupon.create({
        assetID: newAsset.id,
        name: data.body.name,
        templateID: template.id,
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
  getAllAssetCategory,
  createVoucher,
};
