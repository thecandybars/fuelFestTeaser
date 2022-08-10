// ALTHOUGH it works, when exporting VSCode won´t recognize the imports as linkable

// const fs = require("fs");
// let controllers = {};
// fs.readdirSync(__dirname)
//   .filter((file) => file !== "index.js" && file.split(".").pop() === "js")
//   .map((file) => {
//     const controller = require(`./${file.slice(0, file.lastIndexOf("."))}`); // const controller = require("./controller");
//     controllers = { ...controllers, ...controller };
//   });

// module.exports = { ...controllers };
// // module.exports = controllers;

const festival = require("./festival");
const user = require("./user");
const userCategory = require("./userCategory");
const event = require("./event.js");
const car = require("./car.js");
const carOwner = require("./carOwner.js");
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
  ...userCategory,
  ...event,
  ...car,
  ...carOwner,
  ...favorite,
  ...vote,
  ...vendor,
  ...sponsor,
  ...wallet,
  ...transaction,
  ...asset,
};
