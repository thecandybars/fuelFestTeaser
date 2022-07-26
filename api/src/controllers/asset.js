const { randomUUID } = require("crypto");
const dbError = require("../utils/dbError");
const {
  Asset,
  AssetCategory,
  AstNFTCard,
  TokenCoupon,
  Voucher,
  Wallet,
} = require("../db.js");
const {
  createTokenTransaction,
  createAssetTransaction,
} = require("./transaction.js");

/////// ASSET /////////////////

async function getAssets(walletID) {
  try {
    const assets = Asset.findAll({
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
async function createAssetCategory(data) {
  try {
    const newCategory = AssetCategory.create({
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
      assetDetails = await Voucher.findByPk(assetID);
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
    const collectionUUID = randomUUID();
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
        collection: collectionUUID,
        schema: data.body.schema,
        template: data.body.template,
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
    const collectionUUID = randomUUID();
    const assetsCreated = [];
    const assetCategory = await AssetCategory.findOne({
      where: { table: "Voucher" },
    });
    if (!assetCategory)
      return dbError(
        `Voucher asset category not found. Create category first`,
        404
      );

    for (let i = 1; i <= data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryID: assetCategory.id,
        isListed: true,
        walletID: data.params.walletID,
      });
      const newVoucher = await Voucher.create({
        assetID: newAsset.id,
        name: data.body.name,
        collection: collectionUUID,
        schema: data.body.schema,
        template: data.body.template,
        image: data.file.path,
        burnable: data.body.burnable,
        transferable: data.body.transferable,
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
    const collectionUUID = randomUUID();
    const tokensCreated = [];
    const tokenCouponCategory = await AssetCategory.findOne({
      where: { table: "TokenCoupon" },
    });
    if (!tokenCouponCategory)
      return dbError(
        `Token Coupon category not found. Create category first`,
        404
      );
    for (let i = 0; i < data.params.quantity; i++) {
      const newAsset = await Asset.create({
        categoryID: tokenCouponCategory.id,
        isListed: false,
        walletID: data.params.walletID,
      });
      const newToken = await TokenCoupon.create({
        assetID: newAsset.id,
        name: data.body.name,
        collection: collectionUUID,
        image: data.file.path,
        tokenAmount: parseInt(data.body.amount),
        isBurnt: false,
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

module.exports = {
  createTokenCoupon,
  createAssetCategory,
  createNFTCard,
  buyAsset,
  getAssets,
  createVoucher,
};
