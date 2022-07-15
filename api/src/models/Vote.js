const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("vote", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // carId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // userId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // categoryId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });
};
