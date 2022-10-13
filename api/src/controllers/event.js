const dbError = require("../utils/dbError");
const { Event, MapLocation } = require("../db.js");
const { getCurrentFestival } = require("./festival");

/////// EVENTS /////////////////

async function getAllEvents() {
  try {
    const festival = await getCurrentFestival();
    const response = await Event.findAll({
      where: { festivalId: festival.id },
      order: [["date", "ASC"]],
      include: MapLocation,
      // order: sequelize.literal("date DESC"),
    });
    return !response ? dbError(`No events found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getEventById(id) {
  try {
    const festival = await getCurrentFestival();
    const event = await Event.findByPk(id, { include: MapLocation });
    const response =
      event.festivalId === festival.id
        ? event
        : dbError(`Event ${id} belongs to festival ${event.festivalId}`, 404);
    return !response ? dbError(`Event ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function editEvent(id, data) {
  try {
    const response = await Event.upsert({
      id,
      ...data,
    });
    return !response ? dbError(`Event ${id} not found`, 404) : response;
  } catch (err) {
    return err;
  }
}
async function createEvent(data) {
  try {
    const response = await Event.create({
      ...data.body,
      image: data.file.path,
    });
    return !response ? dbError(`Event not created`, 404) : response;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  editEvent,
};
