const dbError = require("../utils/dbError");
const { getCurrentFestival } = require("./festival");
const {
  User,
  Wallet,
  Sponsor,
  Event,
  Car,
  Vendor,
  FavSponsor,
  FavVendor,
  FavCar,
  FavEvent,
} = require("../db.js");

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
async function getUsersById(data) {
  try {
    const id = data.params.id;
    const currentFestival = await getCurrentFestival();
    const favorites =
      data.query.favorites && data.query.favorites === "true"
        ? [
            {
              model: Sponsor,
              where: { festivalId: currentFestival.id },
            },
            {
              model: Event,
              where: { festivalId: currentFestival.id },
            },
            {
              model: Car,
              where: { festivalId: currentFestival.id },
            },
            {
              model: Vendor,
              where: { festivalId: currentFestival.id },
            },
          ]
        : [];
    const response = await User.findByPk(id, {
      include: [Wallet, ...favorites],
    });
    return !response ? dbError(`User ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createUser(data) {
  console.log(
    "🚀 ~ file: user.js ~ line 62 ~ createUser ~ data",
    !!data.body.walletId
  );

  try {
    const response = await User.create({
      firstName: data.body.firstName,
      lastName: data.body.lastName,
      image: data.file.path,
      usercategoryId: data.body.usercategoryId,
      walletId: !!data.body.walletId ? data.body.walletId : null,
    });
    return !response ? dbError("Error creating user", 401) : response;
  } catch (err) {
    return err;
  }
}

/// FAVORITES
async function toggleFavSponsor(userId, sponsorId) {
  try {
    const [response, created] = await FavSponsor.findOrCreate({
      where: { userId, sponsorId },
      default: {
        userId,
        sponsorId,
      },
    });

    if (!created) {
      await FavSponsor.destroy({
        where: { userId, sponsorId },
      });
    }
    return `Favorite sponsor ${sponsorId} ${
      created ? "created" : "destroyed"
    } for user ${userId}`;
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

async function toggleFavVendor(userId, vendorId) {
  try {
    const [response, created] = await FavVendor.findOrCreate({
      where: { userId, vendorId },
      default: {
        userId,
        vendorId,
      },
    });

    if (!created) {
      await FavVendor.destroy({
        where: { userId: userId, vendorId: vendorId },
      });
    }
    return `Favorite vendor ${vendorId} ${
      created ? "created" : "destroyed"
    } for user ${userId}`;
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
  createUser,
  getAllUsers,
  getUsersById,
  toggleFavSponsor,
  toggleFavEvent,
  toggleFavVendor,
  toggleFavCar,
};
