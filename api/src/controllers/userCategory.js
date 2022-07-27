const dbError = require("../utils/dbError");
const { UserCategory } = require("../db.js");

//////// USERS ////////////////

async function getAllUserCategories() {
  try {
    const response = await UserCategory.findAll();
    return response && response.length === 0
      ? dbError(`No User Categories found`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function getUserCategoryById(id) {
  try {
    const response = await UserCategory.findByPk(id);
    return !response ? dbError(`User Category ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createUserCategory(data) {
  try {
    const response = await UserCategory.create({
      title: data.body.title,
      category: data.body.category,
    });
    return !response ? dbError("Error creating user category", 401) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createUserCategory,
  getAllUserCategories,
  getUserCategoryById,
};
