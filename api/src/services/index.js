const axios = require("axios");
const { Op } = require("sequelize");

const user = require("./user");
const event = require("./event.js");
const car = require("./car.js");
const favorite = require("./favorite.js");
const vote = require("./vote.js");
const vendor = require("./vendor.js");
const sponsor = require("./sponsor.js");
const wallet = require("./wallet.js");
const transaction = require("./transaction.js");

module.exports = {
  ...user,
  ...event,
  ...car,
  ...favorite,
  ...vote,
  ...vendor,
  ...sponsor,
  ...wallet,
  ...transaction,
};
