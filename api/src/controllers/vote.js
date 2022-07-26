const { Vote, VoteCategory } = require("../db.js");
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

async function carVote(userId, carId, categoryId) {
  try {
    const [response, created] = await Vote.findOrCreate({
      where: { userId: userId, carId: carId, categoryId: categoryId },
      default: { userId: userId, carId: carId, categoryId: categoryId },
    });
    return created && !response ? dbError(`Alredy voted!`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createVoteCategory,
  carVote,
};
