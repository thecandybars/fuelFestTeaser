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
    const { fromWalletId, toWalletId, assetId } = data;

    const newTransaction = await Transaction.create({
      title: "asset transaction",
    });
    const newAssetLedger = await AssetLedger.create({
      fromWalletId,
      toWalletId,
      assetId,
      transactionId: newTransaction.id,
    });
    await Asset.update(
      {
        walletId: toWalletId,
      },
      {
        where: { id: assetId },
      }
    );

    return newAssetLedger;
  } catch (err) {
    return err;
  }
}
async function createTokenTransaction(data) {
  try {
    const { fromWalletId, toWalletId, amount, title } = data;

    if (amount <= 0)
      return dbError(`Only positive token amounts. That's stealing!`, 400);

    const fromWallet = await Wallet.findByPk(fromWalletId);
    if (!fromWallet)
      return dbError(`No origin wallet ${fromWalletId} found`, 404);
    if (fromWallet.liquid < amount)
      return dbError(`Origin wallet ${fromWalletId} hasn't enough tokens`, 404);

    const toWallet = await Wallet.findByPk(toWalletId);
    if (!toWallet)
      return dbError(`No destination wallet ${toWalletId} found`, 404);

    // console.table(toWallet.toJSON());
    const newTransaction = await Transaction.create({
      title: title ? title : "",
    });
    const newTokenLedger = await TokenLedger.create({
      fromWalletId,
      toWalletId,
      amount,
      transactionId: newTransaction.id,
    });
    await Wallet.update(
      {
        liquid: toWallet.liquid + amount,
      },
      { where: { id: toWalletId } }
    );
    await Wallet.update(
      {
        liquid: fromWallet.liquid - amount,
      },
      { where: { id: fromWalletId } }
    );

    return newTokenLedger;
  } catch (err) {
    return err;
  }
}
// Create new COUPON transaction (Owner burns token coupon, the recepient receives tokens)
async function createCouponTransaction(data) {
  try {
    const { toWalletId, assetId } = data;

    const asset = await Asset.findByPk(assetId, {
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetId} not found`, 404);
    if (asset.assetCategory.table !== "TokenCoupon")
      return dbError(`Asset ${assetId} is not a Token Coupon`, 404);

    const tokenCoupon = await TokenCoupon.findOne({ where: { assetId } });
    if (tokenCoupon.isBurnt)
      return dbError(`Token coupon ${assetId} was already burnt`);

    const fromWallet = await Wallet.findByPk(asset.walletId);
    const toWallet = await Wallet.findByPk(toWalletId);

    // Don´t needed: tokens are created on demand
    // if (fromWallet.liquid < tokenCoupon.tokenAmount)
    //   return dbError(
    //     `Owner wallet ${asset.walletId} hasn't enough liquid tokens`
    //   );

    //burn!!
    await TokenCoupon.update({ isBurnt: true }, { where: { assetId } });
    // create tokens on demand for fromWallet (this way we can keep track of the token transaction)
    await Wallet.update(
      { liquid: fromWallet.liquid + tokenCoupon.tokenAmount },
      { where: { id: fromWallet.id } }
    );
    // transfer tokens
    const newTokenTransaction = await createTokenTransaction({
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
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
    const { toWalletId, assetId } = data;

    const asset = await Asset.findByPk(assetId, {
      include: AssetCategory,
    });
    if (!asset) return dbError(`Asset ${assetId} not found`, 404);
    if (asset.assetCategory.table !== "Voucher")
      return dbError(`Asset ${assetId} is not a Voucher`, 404);

    const voucher = await Voucher.findOne({ where: { assetId } });
    if (voucher.isBurnt) return dbError(`Voucher ${assetId} was already burnt`);

    const fromWallet = await Wallet.findByPk(asset.walletId);
    const toWallet = await Wallet.findByPk(toWalletId);

    // Owner sends voucher to recipient
    const newAssetTransaction = await createAssetTransaction({
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
      assetId: asset.id,
    });
    // Recipient burns voucher
    const newVoucher = await Voucher.update(
      { isBurnt: true },
      { where: { assetId } }
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
