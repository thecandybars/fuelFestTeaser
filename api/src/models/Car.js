const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("car", {
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
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tireManufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chasis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geolocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
