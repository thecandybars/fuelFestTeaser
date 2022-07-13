const axios = require("axios");
const { Op } = require("sequelize");
const { Car, CarVoteCategory } = require("../db.js");

/////// CAR /////////////////

async function getAllCars() {
  try {
    const response = await Car.findAll();
    return response;
  } catch (err) {
    return err;
  }
}

async function getCarById(id) {
  try {
    const response = await Car.findByPk(id);
    return response;
  } catch (err) {
    return err;
  }
}
async function editCar(id, data) {
  try {
    const response = await Car.upsert({
      id,
      ...data,
    });
    return response;
  } catch (err) {
    return err;
  }
}
async function getVoteCategories(id) {
  try {
    const response = await CarVoteCategory.findAll({
      where: { carId: id },
    });
    return response;
  } catch (err) {
    return err;
  }
}
async function addCategoryToCar(carId, categoryId) {
  try {
    // const response = "";
    // // const car = await Car.findByPk(carId);
    // // if (car === null) return "Car " + carId + " not found";
    // const car = await Car.findOne({
    //   where: {
    //     id: carId,
    //   },
    //   include: CarVoteCategory,
    // });
    // console.log("🚀 ~ file: car.js ~ line 46 ~ addCategoryToCar ~ car", car);
    // // const carVoteCategories = await car.getCarVoteCategory();
    // // console.log(
    // //   "🚀 ~ file: car.js ~ line 48 ~ addCategoryToCar ~ carVoteCategories",
    // //   carVoteCategories
    // // );

    const car = await Car.findByPk(carId);
    if (car === null) return "Car " + carId + " not found";

    const category = await CarVoteCategory.findOne({
      where: { carId: carId, categoryId: categoryId },
    });
    if (category !== null)
      return "Car " + carId + " already has category " + categoryId;

    const response = await CarVoteCategory.create({ carId, categoryId });

    return response;
  } catch (err) {
    return err;
  }
}
async function createCar(data) {
  const { carVoteCategories } = data;
  // delete data["carVoteCategories"];

  try {
    const newCar = await Car.create({
      ...data,
    });
    const carId = newCar.id;
    // Tried using mixin method addCarVoteCategories, didn't work
    // newCar.addCarVoteCategories(carVoteCategories);

    carVoteCategories &&
      carVoteCategories.length > 0 &&
      carVoteCategories.forEach(async (e) => {
        // This works but problem using addCarVoteCategories needs to be solved
        await CarVoteCategory.create({ carId, voteCategoryId: e });
        // await newCar.addCarVoteCategory(carVoteCategory);
      });
    return newCar;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  editCar,
  addCategoryToCar,
  getVoteCategories,
};
