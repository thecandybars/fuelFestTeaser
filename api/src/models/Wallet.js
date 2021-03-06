const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("wallet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    liquid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    frozen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
