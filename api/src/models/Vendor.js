const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("vendor", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isSponsor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionShort: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descriptionLong: {
      type: DataTypes.STRING(700),
      allowNull: true,
    },
    timeOpen: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    timeClose: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
};
