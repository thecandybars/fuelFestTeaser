const { Vote, VoteCategory, CarVoteCategory, Wallet } = require("../db.js");
const dbError = require("../utils/dbError");

/////// Vote /////////////////

async function createVoteCategory(data) {
  try {
    const response = await VoteCategory.create({
      title: data.title,
      desc: data.desc,
    });
    return !response ? dbError(`Vote Category not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function carVote(walletID, carID, categoryID) {
  try {
    const wallet = Wallet.findByPk(walletID);
    if (!wallet) return dbError(`Wallet ${walletID} not found`, 404);
    if (wallet.frozen === 0)
      return dbError(`You have to freeze some tokens before voting`, 400);

    const carVoteCategory = await CarVoteCategory.findOne({
      where: { carId: carID, voteCategoryId: categoryID },
    });
    if (!carVoteCategory)
      return dbError(`Can't vote category ${categoryID} for car ${carID}`, 404);

    const vote = await Vote.findOne({ where: { walletID, carID, categoryID } });
    if (vote) return dbError(`Alredy voted!`, 404);

    const response = await Vote.create({
      walletID,
      carID,
      categoryID,
      votingTokens: 333,
    });
    return !response ? dbError(`Alredy voted!`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createVoteCategory,
  carVote,
};
