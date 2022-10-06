const dbError = require("../utils/dbError");
const { Sponsor, Car, Vendor } = require("../db.js");
const { getCurrentFestival } = require("./festival");

/////// SPONSORS /////////////////

async function getAllSponsors() {
  try {
    const festival = await getCurrentFestival();
    const response = await Sponsor.findAll({
      where: { festivalId: festival.id },
      include: [Car, Vendor],
    });
    return !response ? dbError(`No sponsors found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getSponsorById(id) {
  try {
    const festival = await getCurrentFestival();
    const sponsor = await Sponsor.findByPk(id, { Include: Car });
    const response =
      sponsor.festivalId === festival.id
        ? sponsor
        : dbError(
            `Sponsor ${id} belongs to festival ${sponsor.festivalId}`,
            404
          );
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
      ...data.body,
      image: data.files[0].path,
      logo: data.files[1].path,
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
