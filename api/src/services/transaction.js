/////// Transaction /////////////////

const {
  Transaction,
  TransactionCategory,
  Ledger,
  TokensInLedger,
  Wallet,
} = require("../db.js");

async function createTokenTransaction(data) {
  const { walletID, transactionCategoryID, tokenAmount } = data;

  try {
    const { debit } = await TransactionCategory.findByPk(transactionCategoryID);
    const newTransaction = await Transaction.create();
    const newLedgerEntry = await Ledger.create({
      walletID,
      transactionCategoryID,
      transactionID: newTransaction.id,
    });
    const newTokensEntry = await TokensInLedger.create({
      tokenAmount,
    });
    const wallet = await Wallet.findByPk(walletID);
    const actualLiquid = wallet.liquid;

    if (debit) {
      await Wallet.upsert({ id: walletID, liquid: actualLiquid + tokenAmount });
    } else {
      await Wallet.upsert({ id: walletID, liquid: actualLiquid - tokenAmount });
    }
    return newTransaction;
  } catch (err) {
    return err;
  }
}
async function createTransactionCategory(data) {
  try {
    const response = await TransactionCategory.create({
      ...data,
    });
    return response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createTransactionCategory,
  createTokenTransaction,
};
