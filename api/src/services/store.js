const axios = require("axios");
const { Op } = require("sequelize");
const { Store } = require("../db.js");

/////// Stores /////////////////

async function getAllStores() {
  try {
    const response = await Store.findAll();
    return !response ? dbError(`No stores found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getStoreById(id) {
  try {
    const response = await Store.findByPk(id);
    return !response ? dbError(`Store ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function editStore(id, data) {
  try {
    const response = await Store.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Store ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createStore(data) {
  try {
    const response = await Store.create({
      ...data,
    });
    return !response ? dbError(`Store not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  editStore,
};
