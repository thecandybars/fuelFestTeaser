require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

///////////
// copiado de https://github.com/dierodz/workshop-heroku
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fuelFest`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

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
  CarOwner,
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
  VoucherCoupon,
  Badge,
  Template,
} = sequelize.models;

// FESTIVAL
Festival.hasOne(Event, { through: "festivalId" });
Festival.hasOne(Vendor, { through: "festivalId" });
Festival.hasOne(Sponsor, { through: "festivalId" });
Festival.hasOne(Car, { through: "festivalId" });

// USERS
User.belongsTo(UserCategory, { foreignKey: "userCategoryId" });

// FAVORITES

User.belongsToMany(Event, { through: "FavEvent" });
Event.belongsToMany(User, { through: "FavEvent" });

User.belongsToMany(Car, { through: "FavCar" });
Car.belongsToMany(User, { through: "FavCar" });

User.belongsToMany(Vendor, { through: "FavVendor" });
Vendor.belongsToMany(User, { through: "FavVendor" });

User.belongsToMany(Sponsor, { through: "FavSponsor" });
Sponsor.belongsToMany(User, { through: "FavSponsor" });

Car.hasMany(CarImage, { foreignKey: "carId" });
CarOwner.hasMany(Car, { foreignKey: "carOwnerId" });
Car.belongsTo(CarOwner, { foreignKey: "carOwnerId" });
Car.belongsToMany(Sponsor, { through: "CarSponsor" });
Sponsor.belongsToMany(Car, { through: "CarSponsor" });

// VOTING

VoteCategory.belongsToMany(Car, {
  through: "CarVoteCategory",
  timestamps: false,
});
Car.belongsToMany(VoteCategory, { through: "CarVoteCategory" });

Car.hasMany(Vote, { foreignKey: "carId" });
Vote.belongsTo(Car, { foreignKey: "carId" });

Wallet.hasMany(Vote, { foreignKey: "walletId" });
Vote.belongsTo(Wallet, { foreignKey: "walletId" });

VoteCategory.hasMany(Vote, { foreignKey: "categoryId" });
Vote.belongsTo(VoteCategory, { foreignKey: "categoryId" });

// USER WALLET

Wallet.hasOne(User, { foreignKey: "walletId" });
User.belongsTo(Wallet, { foreignKey: "walletId" });

// LEDGER ASSETS AND TOKENS

AssetLedger.belongsTo(Wallet, { foreignKey: "fromWalletId" });
AssetLedger.belongsTo(Wallet, { foreignKey: "toWalletId" });
AssetLedger.belongsTo(Transaction, { foreignKey: "transactionId" });
AssetLedger.belongsTo(Asset, { foreignKey: "assetId" });

TokenLedger.belongsTo(Wallet, { foreignKey: "fromWalletId" });
TokenLedger.belongsTo(Wallet, { foreignKey: "toWalletId" });
TokenLedger.belongsTo(Transaction, { foreignKey: "transactionId" });

Asset.belongsTo(Wallet, { foreignKey: "walletId" });
Asset.belongsTo(AssetCategory, { foreignKey: "categoryId" });
Asset.hasMany(TokenCoupon, { foreignKey: "assetId" });
Asset.hasOne(AstNFTCard, { foreignKey: "assetId" });
Asset.hasMany(Voucher, { foreignKey: "assetId" });
Asset.hasMany(VoucherCoupon, { foreignKey: "assetId" });
Asset.hasMany(Badge, { foreignKey: "assetId" });

Template.hasMany(AstNFTCard, { foreignKey: "templateId" });
Template.hasMany(Voucher, { foreignKey: "templateId" });
Template.hasMany(TokenCoupon, { foreignKey: "templateId" });
Template.hasMany(VoucherCoupon, { foreignKey: "templateId" });
Template.hasMany(Badge, { foreignKey: "templateId" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
