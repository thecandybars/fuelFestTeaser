const axios = require("axios");
const { Op } = require("sequelize");
const { User, FavEvent, FavCar, Wallet } = require("../db.js");

//////// USERS ////////////////

async function getAllUsers() {
  try {
    const response = await User.findAll();
    return response;
  } catch (err) {
    return err;
  }
}
async function getUsersById(id) {
  try {
    const response = await User.findByPk(id, { include: Wallet });
    return response;
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
    return response;
  } catch (err) {
    return err;
  }
}
/////////////////
// FAVORITES
///////////////

async function getUserFavEvents(id) {
  try {
    const response = await FavEvent.findAll({
      where: {
        userId: id,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}
async function toggleFavEvent(userId, eventId) {
  try {
    const [response, created] = await FavEvent.findOrCreate({
      where: { userId: userId, eventId: eventId },
      default: {
        userId,
        eventId,
      },
    });

    if (!created) {
      await FavEvent.destroy({
        where: { userId: userId, eventId: eventId },
      });
    }
    return response;
  } catch (err) {
    return err;
  }
}

async function getUserFavCars(id) {
  try {
    const response = await FavCar.findAll({
      where: {
        userId: id,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}
async function toggleFavCar(userId, carId) {
  try {
    const [response, created] = await FavCar.findOrCreate({
      where: { userId: userId, carId: carId },
      default: {
        userId,
        carId,
      },
    });

    if (!created) {
      await FavCar.destroy({
        where: { userId: userId, carId: carId },
      });
    }
    return response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUsersById,
  getUserFavEvents,
  toggleFavEvent,
  getUserFavCars,
  toggleFavCar,
};
