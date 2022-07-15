const axios = require("axios");
const { Op } = require("sequelize");
const { Sponsor } = require("../db.js");

/////// SPONSORS /////////////////

async function getAllSponsors() {
  try {
    const response = await Sponsor.findAll();
    return !response ? dbError(`No sponsors found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getSponsorById(id) {
  try {
    const response = await Sponsor.findByPk(id);
    return !response ? dbError(`Sponsor ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function editSponsor(id, data) {
  try {
    const response = await Sponsor.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Event ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createSponsor(data) {
  try {
    const response = await Sponsor.create({
      ...data,
    });
    return !response ? dbError(`Sponsor not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllSponsors,
  getSponsorById,
  createSponsor,
  editSponsor,
};
