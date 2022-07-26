const festival = require("./festival");
const user = require("./user");
const event = require("./event.js");
const car = require("./car.js");
const favorite = require("./favorite.js");
const vote = require("./vote.js");
const vendor = require("./vendor.js");
const sponsor = require("./sponsor.js");
const wallet = require("./wallet.js");
const transaction = require("./transaction.js");
const asset = require("./asset.js");

module.exports = {
  ...festival,
  ...user,
  ...event,
  ...car,
  ...favorite,
  ...vote,
  ...vendor,
  ...sponsor,
  ...wallet,
  ...transaction,
  ...asset,
};
