const axios = require("axios");
const { Op } = require("sequelize");
const { Sponsor } = require("../db.js");

/////// SPONSORS /////////////////

async function getAllSponsors() {
  try {
    const response = await Sponsor.findAll();
    return response;
  } catch (err) {
    return err;
  }
}

async function getSponsorById(id) {
  try {
    const response = await Sponsor.findByPk(id);
    return response;
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
    return response;
  } catch (err) {
    return err;
  }
}
async function createSponsor(data) {
  try {
    const response = await Sponsor.create({
      ...data,
    });
    return response;
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
