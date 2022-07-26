const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tokenCoupon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isBurnt: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
