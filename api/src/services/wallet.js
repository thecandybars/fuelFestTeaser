// const axios = require("axios");
// const { Op } = require("sequelize");
const { Wallet, User } = require("../db.js");

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

module.exports = {
  getAllWallets,
  getWalletById,
  createWallet,
  editWallet,
};
