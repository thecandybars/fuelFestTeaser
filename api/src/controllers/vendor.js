const dbError = require("../utils/dbError");
const { Vendor } = require("../db.js");

/////// Vendors /////////////////

async function getAllVendors() {
  try {
    const response = await Vendor.findAll();
    return !response ? dbError(`No Vendors found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getVendorById(id) {
  try {
    const response = await Vendor.findByPk(id);
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
