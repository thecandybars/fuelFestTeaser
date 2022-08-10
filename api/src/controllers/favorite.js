const dbError = require("../utils/dbError");
const {
  FavEvent,
  FavCar,
  FavSponsor,
  FavVendor,
  Event,
  Car,
  Sponsor,
  Vendor,
} = require("../db.js");
const { getCurrentFestival } = require("./festival");

////////// EVENTS
async function getFavEvent(id) {
  try {
    const currentFestival = await getCurrentFestival();

    const events = await FavEvent.findAll({
      where: { userId: id },
    });

    const response = [];
    for (let i = 0; i < events.length; i++) {
      const event = await Event.findByPk(events[i].eventId);
      if (event.festivalId === currentFestival.id) response.push(event);
    }

    return response;
    // return response && response.length === 0
    //   ? dbError("No favorite events found for user " + id, 401)
    //   : response;
  } catch (err) {
    return err;
  }
}
// async function toggleFavEvent(userId, eventId) {
//   try {
//     const [response, created] = await FavEvent.findOrCreate({
//       where: { userId: userId, eventId: eventId },
//       default: {
//         userId,
//         eventId,
//       },
//     });

//     if (!created) {
//       await FavEvent.destroy({
//         where: { userId: userId, eventId: eventId },
//       });
//     }
//     return `Favorite event ${eventId} ${
//       created ? "created" : "destroyed"
//     } for user ${userId}`;
//   } catch (err) {
//     return err;
//   }
// }

////////// SPONSOR
async function getFavSponsor(id) {
  try {
    const currentFestival = await getCurrentFestival();

    const sponsors = await FavSponsor.findAll({
      where: {
        userId: id,
      },
    });

    const response = [];
    for (let i = 0; i < sponsors.length; i++) {
      const sponsor = await Sponsor.findByPk(sponsors[i].sponsorId);
      if (sponsor.festivalId === currentFestival.id) response.push(sponsor);
    }

    return response;
    // return response && response.length === 0
    //   ? dbError("No favorite sponsors found for user " + id, 401)
    //   : response;
  } catch (err) {
    return err;
  }
}
// async function toggleFavSponsor(userId, sponsorId) {
//   try {
//     const [response, created] = await FavSponsor.findOrCreate({
//       where: { userId, sponsorId },
//       default: {
//         userId,
//         sponsorId,
//       },
//     });

//     if (!created) {
//       await FavSponsor.destroy({
//         where: { userId, sponsorId },
//       });
//     }
//     return `Favorite sponsor ${sponsorId} ${
//       created ? "created" : "destroyed"
//     } for user ${userId}`;
//   } catch (err) {
//     return err;
//   }
// }

////////// CAR
async function getFavCar(id) {
  try {
    const currentFestival = await getCurrentFestival();

    const cars = await FavCar.findAll({
      where: {
        userId: id,
      },
    });

    const response = [];
    for (let i = 0; i < cars.length; i++) {
      const car = await Car.findByPk(cars[i].carId);
      if (car.festivalId === currentFestival.id) response.push(car);
    }

    return response;
    // return response && response.length === 0
    //   ? dbError("No favorite cars found for user " + id, 401)
    //   : response;
  } catch (err) {
    return err;
  }
}
// async function toggleFavCar(userId, carId) {
//   try {
//     const [response, created] = await FavCar.findOrCreate({
//       where: { userId: userId, carId: carId },
//       default: {
//         userId,
//         carId,
//       },
//     });

//     if (!created) {
//       await FavCar.destroy({
//         where: { userId: userId, carId: carId },
//       });
//     }
//     return `Favorite car ${carId} ${
//       created ? "created" : "destroyed"
//     } for user ${userId}`;
//   } catch (err) {
//     return err;
//   }
// }

////////// VENDOR
async function getFavVendor(id) {
  try {
    const currentFestival = await getCurrentFestival();

    const vendors = await FavVendor.findAll({
      where: {
        userId: id,
      },
    });

    const response = [];
    for (let i = 0; i < vendors.length; i++) {
      const vendor = await Vendor.findByPk(vendors[i].vendorId);
      if (vendor.festivalId === currentFestival.id) response.push(vendor);
    }
    return response;
    // return response && response.length === 0
    //   ? dbError("No favorite vendor found for user " + id, 401)
    //   : response;
  } catch (err) {
    return err;
  }
}
// async function toggleFavVendor(userId, vendorId) {
//   try {
//     const [response, created] = await FavVendor.findOrCreate({
//       where: { userId, vendorId },
//       default: {
//         userId,
//         vendorId,
//       },
//     });

//     if (!created) {
//       await FavVendor.destroy({
//         where: { userId: userId, vendorId: vendorId },
//       });
//     }
//     return `Favorite vendor ${vendorId} ${
//       created ? "created" : "destroyed"
//     } for user ${userId}`;
//   } catch (err) {
//     return err;
//   }
// }

module.exports = {
  getFavEvent,
  // toggleFavEvent,
  getFavCar,
  // toggleFavCar,
  getFavSponsor,
  // toggleFavSponsor,
  getFavVendor,
  // toggleFavVendor,
};
