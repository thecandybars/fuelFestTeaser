const axios = require("axios");
const { Op } = require("sequelize");
const { dbError } = require("./_common.js");
const { User, Wallet } = require("../db.js");

//////// USERS ////////////////

async function getAllUsers() {
  try {
    const response = await User.findAll();
    return response && response.length === 0
      ? dbError(`No Users found`, 404)
      : response;
  } catch (err) {
    return err;
  }
}
async function getUsersById(id) {
  try {
    const response = await User.findByPk(id, { include: Wallet });
    return !response ? dbError(`User ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createUser(data) {
  const { firstName, lastName, image, walletID } = data;
  try {
    const response = await User.create({
      ...data,
    });
    return !response ? dbError("Error creating user", 401) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUsersById,
};
