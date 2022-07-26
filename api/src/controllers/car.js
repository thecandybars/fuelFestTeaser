const dbError = require("../utils/dbError");
const { Car, CarVoteCategory, CarImage } = require("../db.js");

/////// CAR /////////////////

async function getAllCars() {
  try {
    const response = await Car.findAll();
    return !response ? dbError(`No cars found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getCarById(id) {
  try {
    const response = await Car.findByPk(id);
    return !response ? dbError(`Car ${id} not found`, 404) : response;
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
    return !response ? dbError(`Car ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function getVoteCategories(id) {
  try {
    const response = await CarVoteCategory.findAll({
      where: { carId: id },
    });
    return !response ? dbError(`No vote categories found`, 404) : response;
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
    if (car === null) return dbError("Car " + carId + " not found", 404);

    const category = await CarVoteCategory.findOne({
      where: { carId: carId, categoryId: categoryId },
    });
    if (category !== null)
      return dbError(
        "Car " + carId + " already has category " + categoryId,
        404
      );

    const response = await CarVoteCategory.create({ carId, categoryId });

    return !response
      ? dbError(`Category ${categoryId} added to car ${carId}`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function createCar(data) {
  try {
    const newCar = await Car.create({
      ...data.body,
    });
    // Tried using mixin method addCarVoteCategories, didn't work
    const { carVoteCategories } = data.body;
    // newCar.addCarVoteCategories(carVoteCategories);

    // console.log(Array.isArray(carVoteCategories));
    carVoteCategories &&
      carVoteCategories.length > 0 &&
      carVoteCategories.forEach(async (e) => {
        // This works but problem using addCarVoteCategories needs to be solved
        await CarVoteCategory.create({ carId: newCar.id, voteCategoryId: e });
        // await newCar.addCarVoteCategory(e);
      });

    data.files.map(async (image) => {
      await CarImage.create({
        carID: newCar.id,
        image: image.path,
      });
    });

    const response = newCar;
    return !response ? dbError(`Car not created`, 400) : response;
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
