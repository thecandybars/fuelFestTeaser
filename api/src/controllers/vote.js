const {
  Vote,
  VoteCategory,
  CarVoteCategory,
  Wallet,
  Car,
  CarImage,
  CarOwner,
} = require("../db.js");
const dbError = require("../utils/dbError");

/////// Vote /////////////////

async function getCarsByVotingCategory(data) {
  try {
    const voteCategoryCars = await VoteCategory.findByPk(
      data.params.categoryId,
      { include: [Car] }
      // { include: [Car, Vote] }
    );

    // const voteCategoryCars = await VoteCategory.findOne({
    //   where: { category: data.params.voteCategory },
    //   include: Car,
    // });

    const { cars, ...voteCategory } = voteCategoryCars;
    // const { cars, votes, ...voteCategory } = voteCategoryCars;

    const carsPromises = cars.map(async (car, index) => {
      const carImages = await CarImage.findAll({
        where: { carId: car.id },
      });
      const carOwner = await CarOwner.findByPk(car.carOwnerId);
      // const vote = voteCategoryCars.votes[index];
      return { car, carOwner, carImages };
    });
    const response = Promise.all(carsPromises).then((res) => res);
    return !response ? dbError(`Vote Category has no cars`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function getAllVotingCategories() {
  try {
    const response = await VoteCategory.findAll();
    return !response ? dbError(`Vote Category not created`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createVoteCategory(data) {
  try {
    const response = await VoteCategory.create({
      title: data.body.title,
      icon: data.file.path,
      desc: data.body.desc,
    });
    return !response ? dbError(`Vote Category not created`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function carDeleteVote(req) {
  try {
    const response = await Vote.destroy({
      where: { id: req.params.voteId },
    });
    return !response ? dbError(`Vote not deleted`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function carPutVote(req) {
  try {
    const response = await Vote.update(
      {
        votingTokens: req.body.votingTokens,
      },
      { where: { id: req.params.voteId } }
    );
    return !response ? dbError(`Vote  not updated`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function carPostVote(data) {
  try {
    const wallet = await Wallet.findByPk(data.params.walletId);
    if (!wallet)
      return dbError(`Wallet ${data.params.walletId} not found`, 404);
    if (wallet.frozen === 0)
      return dbError(`You have to freeze some tokens before voting`, 400);

    const carVoteCategory = await CarVoteCategory.findOne({
      where: { carId: data.body.carId, voteCategoryId: data.body.categoryId },
    });

    if (!carVoteCategory)
      return dbError(
        `Can't vote category ${data.body.categoryId} for car ${data.body.carId}`,
        404
      );

    const vote = await Vote.findOne({
      where: {
        walletId: data.params.walletId,
        carId: data.body.carId,
        categoryId: data.body.categoryId,
      },
    });
    // if (vote) return dbError(`Alredy voted!`, 404);

    const votedPerCategory = await Vote.findAll({
      where: {
        walletId: data.params.walletId,
        categoryId: data.body.categoryId,
      },
    });
    const tokensVotedPerCategory = votedPerCategory.reduce(
      (prev, curr) => prev + curr.votingTokens,
      0
    );
    let response = {};
    if (!vote) {
      response = await Vote.create({
        walletId: data.params.walletId,
        carId: data.body.carId,
        categoryId: data.body.categoryId,
        votingTokens: data.body.votingTokens,
      });
    }
    return !response ? dbError(`Alredy voted!`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createVoteCategory,
  carPostVote,
  carPutVote,
  carDeleteVote,
  getCarsByVotingCategory,
  getAllVotingCategories,
};
