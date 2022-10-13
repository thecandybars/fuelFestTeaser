const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "car",
    {
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otherSponsors: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ////////
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      engine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      suspension: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nitro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brakes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tires: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lights: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stereo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      others: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
