const { DataTypes } = require('sequelize');

const reviewSchema = {
  teks_review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sentimen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = reviewSchema;
