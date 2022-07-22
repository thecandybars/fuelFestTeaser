/////// Transaction /////////////////

const {
  Transaction,
  TokenLedger,
  AssetLedger,
  TransactionCategory,
  Wallet,
  Asset,
  AssetCategory,
  TokenCoupon,
} = require("../db.js");
const { dbError } = require("./_common.js");

async function createAssetTransaction(data) {
  try {
    const { fromWalletID, toWalletID, assetID } = data;

    // const fromWallet = await Wallet.findByPk(fromWalletID);
    // if (!fromWallet)
    //   return dbError(`No origin wallet ${fromWalletID} found`, 404);
    // if (fromWallet.liquid < amount)
    //   return dbError(`Origin wallet ${fromWalletID} hasn't enough tokens`, 404);

    // const toWallet = await Wallet.findByPk(toWalletID);
    // if (!toWallet)
    //   return dbError(`No destination wallet ${toWalletID} found`, 404);

    const newTransaction = await Transaction.create({
      title: "asset transaction",
    });
    const newAssetLedger = await AssetLedger.create({
      fromWalletID,
      toWalletID,
      assetID,
      transactionID: newTransaction.id,
    });
    await Asset.update(
      {
        walletID: toWalletID,
      },
      {
        where: { id: assetID },
      }
    );

    return newAssetLedger;
  } catch (err) {
    return err;
  }
}
async function createTokenTransaction(data) {
  try {
    const { fromWalletID, toWalletID, amount } = data;

    const fromWallet = await Wallet.findByPk(fromWalletID);
    if (!fromWallet)
      return dbError(`No origin wallet ${fromWalletID} found`, 404);
    if (fromWallet.liquid < amount)
      return dbError(`Origin wallet ${fromWalletID} hasn't enough tokens`, 404);

    const toWallet = await Wallet.findByPk(toWalletID);
    if (!toWallet)
      return dbError(`No destination wallet ${toWalletID} found`, 404);

    // console.table(toWallet.toJSON());
    const newTransaction = await Transaction.create({ title: "hola" });
    const newTokenLedger = await TokenLedger.create({
      fromWalletID,
      toWalletID,
      amount,
      transactionID: newTransaction.id,
    });
    await Wallet.upsert({
      id: toWalletID,
      liquid: toWallet.liquid + amount,
    });
    await Wallet.upsert({
      id: fromWalletID,
      liquid: fromWallet.liquid - amount,
    });

    return newTokenLedger;
  } catch (err) {
    return err;
  }
}
async function createCouponTransaction(data) {
  try {
    const { toWalletID, assetID } = data;

    const asset = await Asset.findByPk(assetID, {
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetID} not found`, 404);
    if (asset.assetCategory.table !== "TokenCoupon")
      return dbError(`Asset ${assetID} is not a Token Coupon`, 404);

    const tokenCoupon = await TokenCoupon.findOne({
      where: { assetID: assetID },
    });
    if (tokenCoupon.isBurnt)
      return dbError(`Token coupon ${assetID} was already burnt`);

    const fromWallet = await Wallet.findByPk(asset.walletID);
    if (fromWallet.liquid < tokenCoupon.tokenAmount)
      return dbError(
        `Owner wallet ${asset.walletID} hasn't enough liquid tokens`
      );

    //burn!!
    await TokenCoupon.update(
      { isBurnt: true },
      { where: { assetID: assetID } }
    );
    // transfer tokens
    const newTokenTransaction = await createTokenTransaction({
      fromWalletID: asset.walletID,
      toWalletID,
      amount: tokenCoupon.tokenAmount,
    });

    return { coupon: tokenCoupon, tokenTransaction: newTokenTransaction };
  } catch (err) {
    return err;
  }
}

async function createTransactionCategory(data) {
  try {
    const response = await TransactionCategory.create({
      ...data,
    });
    return !response
      ? dbError(`No Transaction Category created`, 404)
      : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createTransactionCategory,
  createTokenTransaction,
  createAssetTransaction,
  createCouponTransaction,
};
