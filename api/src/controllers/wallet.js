const dbError = require("../utils/dbError");
const { Wallet, User, Vote } = require("../db.js");

/////// WALLET /////////////////

async function getAllWallets() {
  try {
    const response = await Wallet.findAll({ include: User });
    return response;
  } catch (err) {
    return err;
  }
}

async function getWalletById(data) {
  try {
    const response = await Wallet.findByPk(data.params.id, {
      include: [User, Vote],
    });
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
    let user = "";
    if (data.userID) {
      user = await User.findByPk(data.userID);
      if (user.walletId) return dbError("User already has a wallet!", 401);
    }
    const newWallet = await Wallet.create({
      ...data,
    });
    // !!user && (await newUser.setWallet(newWallet));
    !!user &&
      (await User.update(
        { walletId: newWallet.id },
        { where: { id: user.id } }
      ));

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
async function manageTokens(data) {
  console.log("🚀 ~ file: wallet.js ~ line 121 ~ manageTokens ~ data", data);
  try {
    // const wallet = await Wallet.findByPk(data.body.walletId);

    const updated = await Wallet.update(
      { liquid: data.body.liquid, frozen: data.body.frozen },
      {
        where: { id: data.params.walletId },
      }
    );
    console.log(
      "🚀 ~ file: wallet.js ~ line 130 ~ manageTokens ~ updated",
      updated
    );
    return updated[0] === 1
      ? { wallet }
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
  manageTokens,
};
