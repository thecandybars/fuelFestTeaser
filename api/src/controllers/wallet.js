const dbError = require("../utils/dbError");
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

async function freezeTokens(data) {
  try {
    const { id, amount } = data;
    const wallet = id && (await Wallet.findByPk(id));
    if (wallet.liquid < amount)
      return dbError(
        `No enough tokens to freeze. Liquid credit : ${wallet.liquid}`,
        404
      );
    const newBalance = {
      liquid: wallet.liquid - amount,
      frozen: wallet.frozen + amount,
    };
    const updated = (newWallet = await Wallet.update(
      { ...newBalance },
      {
        where: { id: wallet.id },
      }
    ));
    return updated[0] === 1
      ? { id, ...newBalance }
      : dbError(`ERROR: Wallet was not updated`, 404);
  } catch (err) {
    return err;
  }
}
async function unFreezeTokens(data) {
  try {
    const { id, amount } = data;
    const wallet = id && (await Wallet.findByPk(id));
    if (wallet.frozen < amount)
      return dbError(
        `No enough tokens to unfreeze. Frozen credit : ${wallet.frozen}`,
        404
      );
    const newBalance = {
      liquid: wallet.liquid + amount,
      frozen: wallet.frozen - amount,
    };
    const updated = (newWallet = await Wallet.update(
      { ...newBalance },
      {
        where: { id: wallet.id },
      }
    ));
    return updated[0] === 1
      ? { id, ...newBalance }
      : dbError(`ERROR: Wallet was not updated`, 404);
  } catch (err) {
    return err;
  }
}
module.exports = {
  getAllWallets,
  getWalletById,
  createWallet,
  editWallet,
  freezeTokens,
  unFreezeTokens,
};
