/////// Transaction /////////////////

const {
  Transaction,
  TokenLedger,
  AssetLedger,
  Voucher,
  Wallet,
  Asset,
  AssetCategory,
  TokenCoupon,
} = require("../db.js");
const dbError = require("../utils/dbError");

async function createAssetTransaction(data) {
  try {
    const { fromWalletID, toWalletID, assetID } = data;

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
    const { fromWalletID, toWalletID, amount, title } = data;

    if (amount <= 0)
      return dbError(`Only positive token amounts. That's stealing!`, 400);

    const fromWallet = await Wallet.findByPk(fromWalletID);
    if (!fromWallet)
      return dbError(`No origin wallet ${fromWalletID} found`, 404);
    if (fromWallet.liquid < amount)
      return dbError(`Origin wallet ${fromWalletID} hasn't enough tokens`, 404);

    const toWallet = await Wallet.findByPk(toWalletID);
    if (!toWallet)
      return dbError(`No destination wallet ${toWalletID} found`, 404);

    // console.table(toWallet.toJSON());
    const newTransaction = await Transaction.create({
      title: title ? title : "",
    });
    const newTokenLedger = await TokenLedger.create({
      fromWalletID,
      toWalletID,
      amount,
      transactionID: newTransaction.id,
    });
    await Wallet.update(
      {
        liquid: toWallet.liquid + amount,
      },
      { where: { id: toWalletID } }
    );
    await Wallet.update(
      {
        liquid: fromWallet.liquid - amount,
      },
      { where: { id: fromWalletID } }
    );

    return newTokenLedger;
  } catch (err) {
    return err;
  }
}
// Create new COUPON transaction (Owner burns token coupon, the recepient receives tokens)
async function createCouponTransaction(data) {
  try {
    const { toWalletID, assetID } = data;

    const asset = await Asset.findByPk(assetID, {
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetID} not found`, 404);
    if (asset.assetCategory.table !== "TokenCoupon")
      return dbError(`Asset ${assetID} is not a Token Coupon`, 404);

    const tokenCoupon = await TokenCoupon.findOne({ where: { assetID } });
    if (tokenCoupon.isBurnt)
      return dbError(`Token coupon ${assetID} was already burnt`);

    const fromWallet = await Wallet.findByPk(asset.walletID);
    const toWallet = await Wallet.findByPk(toWalletID);

    // Don´t needed: tokens are created on demand
    // if (fromWallet.liquid < tokenCoupon.tokenAmount)
    //   return dbError(
    //     `Owner wallet ${asset.walletID} hasn't enough liquid tokens`
    //   );

    //burn!!
    await TokenCoupon.update({ isBurnt: true }, { where: { assetID } });
    // create tokens on demand for fromWallet (this way we can keep track of the token transaction)
    await Wallet.update(
      { liquid: fromWallet.liquid + tokenCoupon.tokenAmount },
      { where: { id: fromWallet.id } }
    );
    // transfer tokens
    const newTokenTransaction = await createTokenTransaction({
      fromWalletID: fromWallet.id,
      toWalletID: toWallet.id,
      amount: tokenCoupon.tokenAmount,
    });

    return { coupon: tokenCoupon, tokenTransaction: newTokenTransaction };
  } catch (err) {
    return err;
  }
}

// Create new VOUCHER transaction = SPEND (Owner sends voucher, the recepient burns coupon)
async function createVoucherTransaction(data) {
  try {
    const { toWalletID, assetID } = data;

    const asset = await Asset.findByPk(assetID, {
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetID} not found`, 404);
    if (asset.assetCategory.table !== "Voucher")
      return dbError(`Asset ${assetID} is not a Voucher`, 404);

    const voucher = await Voucher.findOne({ where: { assetID } });
    if (voucher.isBurnt) return dbError(`Voucher ${assetID} was already burnt`);

    const fromWallet = await Wallet.findByPk(asset.walletID);
    const toWallet = await Wallet.findByPk(toWalletID);

    // Owner sends voucher to recipient
    const newAssetTransaction = await createAssetTransaction({
      fromWalletID: fromWallet.id,
      toWalletID: toWallet.id,
      assetID: asset.id,
    });
    // Recipient burns voucher
    const newVoucher = await Voucher.update(
      { isBurnt: true },
      { where: { assetID } }
    );

    return newVoucher;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createTokenTransaction,
  createAssetTransaction,
  createCouponTransaction,
  createVoucherTransaction,
};
