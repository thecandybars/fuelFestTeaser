const dbError = require("../utils/dbError");
const { FavEvent, FavCar } = require("../db.js");

async function getUserFavEvents(id) {
  try {
    const response = await FavEvent.findAll({
      where: {
        userId: id,
      },
    });
    return response && response.length === 0
      ? dbError("No favorite events found for user " + id, 401)
      : response;
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
    return `Favorite event ${eventId} ${
      created ? "created" : "destroyed"
    } for user ${userId}`;
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
    return response && response.length === 0
      ? dbError(`User ${id} has no favorite cars`, 404)
      : response;
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
    return `Favorite car ${carId} ${
      created ? "created" : "destroyed"
    } for user ${userId}`;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getUserFavEvents,
  toggleFavEvent,
  getUserFavCars,
  toggleFavCar,
};
