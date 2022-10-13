const { Op } = require("sequelize");
const { MapLocation, Car, Event, Vendor } = require("../db.js");
const dbError = require("../utils/dbError");
const dbSuccess = require("../utils/dbSuccess.js");

/////// MAP LOCATION /////////////////

async function getMapLocation(req) {
  try {
    const { mapLocationId } = req.params;
    const mapLocation = await MapLocation.findByPk(mapLocationId, {});
    let info;
    if (mapLocation.category === "car")
      info = await Car.findOne({ where: { locationId: mapLocation.id } });
    if (mapLocation.category === "vendor")
      info = await Vendor.findOne({ where: { locationId: mapLocation.id } });
    // Probably is not needed to look for event or all events info
    if (mapLocation.category === "event")
      info = await Event.findAll({ where: { locationId: mapLocation.id } });

    return Object.keys(mapLocation).length > 0
      ? dbSuccess("Get Map Location " + mapLocation.id, { mapLocation, info })
      : dbError(`No location found`, 404);
  } catch (err) {
    return err;
  }
}

module.exports = {
  getMapLocation,
};
