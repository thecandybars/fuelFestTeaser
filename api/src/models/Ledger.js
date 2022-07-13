const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("ledger", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // walletID: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // transactionCategoryID: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // transactionID: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  });
};
