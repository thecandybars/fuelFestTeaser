const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("mapLocation", {
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
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
