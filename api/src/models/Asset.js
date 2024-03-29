const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("asset", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    // assetId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
    walletId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    isListed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};
