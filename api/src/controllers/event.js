const dbError = require("../utils/dbError");
const { Event } = require("../db.js");

/////// EVENTS /////////////////

async function getAllEvents() {
  try {
    const response = await Event.findAll();
    return !response ? dbError(`No events found`, 404) : response;
  } catch (err) {
    return err;
  }
}

async function getEventById(id) {
  try {
    const response = await Event.findByPk(id);
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
    // const response = data.file;
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
