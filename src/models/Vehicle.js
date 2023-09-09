const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Vehicle', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('compact', 'sedan', 'pickup', 'SUV', 'sport'),
      allowNull: false,
    },
    passengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2,
      },
    },
    transmission: {
      type: DataTypes.ENUM('manual', 'automatic'),
      allowNull: false,
    },
    fuel: {
      type: DataTypes.ENUM('gas', 'diesel', 'electric', 'hybrid'),
      allowNull: false,
    },
    pricePerDay: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING, // isURL
    },
  },
  { timestamps: false }
  );
};
