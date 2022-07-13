const axios = require("axios");
const { Op } = require("sequelize");
const { Event } = require("../db.js");

/////// EVENTS /////////////////

async function getAllEvents() {
  try {
    const response = await Event.findAll();
    return response;
  } catch (err) {
    return err;
  }
}

async function getEventById(id) {
  try {
    const response = await Event.findByPk(id);
    return response;
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
    return response;
  } catch (err) {
    return err;
  }
}
async function createEvent(data) {
  try {
    const response = await Event.create({
      ...data,
    });
    return response;
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
