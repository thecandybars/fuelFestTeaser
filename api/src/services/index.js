const axios = require("axios");
const { Op } = require("sequelize");

const user = require("./user");
const event = require("./event.js");
const car = require("./car.js");
const vote = require("./vote.js");
const store = require("./store.js");
const sponsor = require("./sponsor.js");
const wallet = require("./wallet.js");
const transaction = require("./transaction.js");

module.exports = {
  ...user,
  ...event,
  ...car,
  ...vote,
  ...store,
  ...sponsor,
  ...wallet,
  ...transaction,
};
