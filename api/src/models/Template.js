const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("template", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    festivalID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    walletID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
};
