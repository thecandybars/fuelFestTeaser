const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("astNFTCard", {
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
    mintNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mintTotal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mintMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imageFront: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageBack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageFrontType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageBackType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
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
