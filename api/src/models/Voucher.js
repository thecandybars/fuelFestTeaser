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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schema: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    template: {
      type: DataTypes.STRING,
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
  });
};
