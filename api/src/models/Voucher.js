const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("voucher", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    burnable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    transferable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    expires: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isBurnt: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    redeemedByOwner: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    redeemedByVendor: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
