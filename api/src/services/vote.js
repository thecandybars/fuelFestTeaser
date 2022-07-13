const axios = require("axios");
const { Op } = require("sequelize");
const { Vote, VoteCategory } = require("../db.js");

/////// Vote /////////////////

async function createVoteCategory(data) {
  try {
    const response = await VoteCategory.create({
      title: data.title,
      desc: data.desc,
    });
    return response;
  } catch (err) {
    return err;
  }
}

async function carVote(userId, carId, categoryId) {
  try {
    // const response = await Vote.create({
    //   userId,
    //   carId,
    //   categoryId,
    // });
    // return response;
    const [response, created] = await Vote.findOrCreate({
      where: { userId: userId, carId: carId, categoryId: categoryId },
      default: { userId: userId, carId: carId, categoryId: categoryId },
    });
    return created ? response : "Alredy voted!";
  } catch (err) {
    return err;
  }
}

module.exports = {
  createVoteCategory,
  carVote,
};
