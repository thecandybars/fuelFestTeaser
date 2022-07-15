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
  // needs testing and error checking on every step
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
      newLedgerEntry: newLedgerEntry.id,
    });
    const wallet = await Wallet.findByPk(walletID);
    const actualLiquid = wallet.liquid;

    debit
      ? await Wallet.upsert({
          id: walletID,
          liquid: actualLiquid + tokenAmount,
        })
      : await Wallet.upsert({
          id: walletID,
          liquid: actualLiquid - tokenAmount,
        });

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
};
