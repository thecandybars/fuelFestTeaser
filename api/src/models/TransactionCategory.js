const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("transactionCategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    table: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
