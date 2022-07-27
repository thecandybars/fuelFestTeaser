require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fuelFest`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// TABLE RELATIONS
const {
  Festival,
  User,
  UserCategory,
  Event,
  Car,
  CarImage,
  Sponsor,
  Vendor,
  Vote,
  VoteCategory,
  Wallet,
  TokenLedger,
  AssetLedger,
  Transaction,
  Asset,
  AssetCategory,
  AstNFTCard,
  Voucher,
  TokenCoupon,
} = sequelize.models;

// FESTIVAL
Festival.hasOne(Event, { through: "festivalId" });
Festival.hasOne(Vendor, { through: "festivalId" });
Festival.hasOne(Sponsor, { through: "festivalId" });
Festival.hasOne(Car, { through: "festivalId" });

// USERS
User.belongsTo(UserCategory, { foreignKey: "userCategoryID" });

// FAVORITES

User.belongsToMany(Event, { through: "FavEvent" });
Event.belongsToMany(User, { through: "FavEvent" });

User.belongsToMany(Car, { through: "FavCar" });
Car.belongsToMany(User, { through: "FavCar" });

User.belongsToMany(Vendor, { through: "FavVendor" });
Vendor.belongsToMany(User, { through: "FavVendor" });

User.belongsToMany(Sponsor, { through: "FavSponsor" });
Sponsor.belongsToMany(User, { through: "FavSponsor" });

Car.hasMany(CarImage, { foreignKey: "carID" });
// CarImage.hasMany(Car, { foreignKey: "carID" });

// VOTING

VoteCategory.belongsToMany(Car, { through: "CarVoteCategory" });
Car.belongsToMany(VoteCategory, { through: "CarVoteCategory" });

Car.hasMany(Vote, { foreignKey: "carID" });
Vote.belongsTo(Car, { foreignKey: "carID" });

Wallet.hasMany(Vote, { foreignKey: "walletID" });
Vote.belongsTo(Wallet, { foreignKey: "walletID" });

VoteCategory.hasMany(Vote, { foreignKey: "categoryID" });
Vote.belongsTo(VoteCategory, { foreignKey: "categoryID" });

// USER WALLET

Wallet.hasOne(User, { foreignKey: "walletID" });
User.belongsTo(Wallet, { foreignKey: "walletID" });

// LEDGER ASSETS AND TOKENS

AssetLedger.belongsTo(Wallet, { foreignKey: "fromWalletID" });
AssetLedger.belongsTo(Wallet, { foreignKey: "toWalletID" });
AssetLedger.belongsTo(Transaction, { foreignKey: "transactionID" });
AssetLedger.belongsTo(Asset, { foreignKey: "assetID" });

TokenLedger.belongsTo(Wallet, { foreignKey: "fromWalletID" });
TokenLedger.belongsTo(Wallet, { foreignKey: "toWalletID" });
TokenLedger.belongsTo(Transaction, { foreignKey: "transactionID" });

Asset.belongsTo(Wallet, { foreignKey: "walletID" });
Asset.belongsTo(AssetCategory, { foreignKey: "categoryID" });
Asset.hasMany(TokenCoupon, { foreignKey: "assetID" });
Asset.hasMany(AstNFTCard, { foreignKey: "assetID" });
Asset.hasMany(Voucher, { foreignKey: "assetID" });
// Asset.belongsTo(TokenCoupon, { foreignKey: "assetID" });
// Asset.belongsTo(AstNFTCard, { foreignKey: "assetID" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
