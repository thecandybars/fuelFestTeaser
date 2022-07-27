const dbError = require("../utils/dbError");
const { Vendor } = require("../db.js");
const { getCurrentFestival } = require("./festival");

/////// Vendors /////////////////

async function getAllVendors() {
  try {
    const festival = await getCurrentFestival();
    const response = await Vendor.findAll({
      where: { festivalId: festival.id },
    });
    return !response ? dbError(`No Vendors found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getVendorById(id) {
  try {
    const festival = await getCurrentFestival();
    const vendor = await Vendor.findByPk(id);
    const response =
      vendor.festivalId === festival.id
        ? sponsor
        : dbError(`Vendor ${id} belongs to festival ${vendor.festivalId}`, 404);
    return !response ? dbError(`Vendor ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function editVendor(id, data) {
  try {
    const response = await Vendor.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Vendor ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createVendor(data) {
  try {
    const response = await Vendor.create({
      ...data.body,
      image: data.file.path,
    });
    return !response ? dbError(`Vendor not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  editVendor,
};
