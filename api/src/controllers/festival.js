const { Op } = require("sequelize");
const { Festival } = require("../db.js");
const dbError = require("../utils/dbError");

/////// EVENTS /////////////////

async function getAllFestivals() {
  try {
    const response = await Festival.findAll();
    return !response || !response.length
      ? dbError(`No festivals found`, 404)
      : response;
  } catch (err) {
    return err;
  }
}

async function getFestivalById(id) {
  try {
    const response = await Festival.findByPk(id);
    return !response ? dbError(`Festival ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function getCurrentFestival() {
  try {
    const response = await Festival.findOne({
      where: {
        dateStart: { [Op.lt]: Date.now() },
        dateEnd: { [Op.gt]: Date.now() },
      },
    });

    return !response ? {} : response;
  } catch (err) {
    return err;
  }
}

async function editFestival(id, data) {
  try {
    const response = await Festival.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Festival ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createFestival(data) {
  try {
    const response = await Festival.create({
      ...data.body,
    });
    return !response ? dbError(`Festival not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllFestivals,
  getFestivalById,
  createFestival,
  editFestival,
  getCurrentFestival,
};
