const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("voucherCoupon", {
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
    template: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voucherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isBurnt: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    expires: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
