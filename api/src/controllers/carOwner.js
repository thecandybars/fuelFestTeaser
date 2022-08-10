const dbError = require("../utils/dbError");
const { CarOwner, Car } = require("../db.js");
const { getCurrentFestival } = require("./festival");

/////// CAR /////////////////

async function getAllCarOwners() {
  try {
    const festival = await getCurrentFestival();
    const response = await CarOwner.findAll({
      where: { festivalId: festival.id },
      include: CarImage,
    });
    return !response ? dbError(`No cars found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getCarOwnerById(id) {
  try {
    const festival = await getCurrentFestival();
    const car = await CarOwner.findByPk(id, {
      include: {
        model: VoteCategory,
        attributes: ["id", "title", "desc"],
        include: Car,
      },
    });
    const response =
      car.festivalId === festival.id
        ? car
        : dbError(`Car ${id} belongs to festival ${car.festivalId}`, 404);
    return !response ? dbError(`Car ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function editCarOwner(id, data) {
  try {
    const response = await CarOwner.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Car ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function createCarOwner(data) {
  try {
    const response = await CarOwner.create({
      ...data.body,
    });
    return !response ? dbError(`Car Owner not created`, 400) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllCarOwners,
  getCarOwnerById,
  editCarOwner,
  createCarOwner,
};
