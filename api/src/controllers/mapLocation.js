const { Op } = require("sequelize");
const { MapLocation, Car, Event, Vendor } = require("../db.js");
const dbError = require("../utils/dbError");
const dbSuccess = require("../utils/dbSuccess.js");

/////// MAP LOCATION /////////////////

async function getMapLocation(req) {
  try {
    const { mapLocationId } = req.params;
    const mapLocation = await MapLocation.findByPk(mapLocationId);
    return Object.keys(mapLocation).length > 0
      ? dbSuccess("Get Map Location " + mapLocation.id, mapLocation)
      : dbError(`No location found`, 404);
  } catch (err) {
    return err;
  }
}

module.exports = {
  getMapLocation,
};
