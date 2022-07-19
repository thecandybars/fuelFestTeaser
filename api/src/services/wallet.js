// const axios = require("axios");
// const { Op } = require("sequelize");
const { Wallet, User, Transaction, TokenLedger } = require("../db.js");

/////// WALLET /////////////////

async function getAllWallets() {
  try {
    const response = await Wallet.findAll();
    return response;
  } catch (err) {
    return err;
  }
}

async function getWalletById(id) {
  try {
    const response = await Wallet.findByPk(id, { include: User });
    return response;
  } catch (err) {
    return err;
  }
}
async function editWallet(id, data) {
  try {
    const wallet = await Wallet.upsert(
      {
        id,
        ...data,
      },
      { include: User }
    );
    if (data.userID) {
      await wallet.setUser("");
      const newUser = await User.findByPk(data.userID);
      newUser && (await newUser.setWallet(newWallet));
    }
    return wallet;
  } catch (err) {
    return err;
  }
}

async function createWallet(data) {
  try {
    const newWallet = await Wallet.create({
      ...data,
    });

    if (data.userID) {
      const newUser = await User.findByPk(data.userID);
      newUser && (await newUser.setWallet(newWallet));
    }

    return newWallet;
  } catch (err) {
    return err;
  }
}

async function sendTokens(data) {
  try {
    const { fromWalletID, toWalletID, amount } = data;
    const fromWallet = await Wallet.findByPk(fromWalletID);
    const toWallet = await Wallet.findByPk(toWalletID);

    // console.table(toWallet.toJSON());

    // if (fromWallet && toWallet && fromWallet.liquid >= amount) {
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
    // } else {
    //   console.log("error"); // error
    // }
    const response = newTokenLedger;
    return !response ? dbError(`No vote categories found`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllWallets,
  getWalletById,
  createWallet,
  editWallet,
  sendTokens,
};
