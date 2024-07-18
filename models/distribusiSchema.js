const { DataTypes } = require('sequelize');

const distribusiSchema = {
  kata: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  negatif: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  positif: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
};

module.exports = distribusiSchema;
