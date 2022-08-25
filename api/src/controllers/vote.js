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

async function getVoteCategoryByCat(data) {
  try {
    const voteCategoryCars = await VoteCategory.findOne({
      where: { category: data.params.voteCategory },
      include: Car,
    });

    const { cars, ...voteCategory } = voteCategoryCars;

    const carsPromises = cars.map(async (car) => {
      const carImages = await CarImage.findAll({
        where: { carId: car.id },
      });
      const carOwner = await CarOwner.findByPk(car.carOwnerId);
      return { car, carOwner, carImages };
    });
    const response = Promise.all(carsPromises).then((res) => res);
    return !response ? dbError(`Vote Category has no cars`, 404) : response;
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

async function carVote(data) {
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
    if (vote) return dbError(`Alredy voted!`, 404);

    const response = await Vote.create({
      walletId: data.params.walletId,
      carId: data.body.carId,
      categoryId: data.body.categoryId,
      votingTokens: data.body.votingTokens,
    });
    return !response ? dbError(`Alredy voted!`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createVoteCategory,
  carVote,
  getVoteCategoryByCat,
};
