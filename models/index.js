const { Sequelize } = require('sequelize');
const distribusiSchema = require('./distribusiSchema');
const reviewSchema = require('./reviewSchema');

// Connect to Database
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  logging: false,
});

const Distribusi = sequelize.define('distribusi', distribusiSchema, {
  underscored: true,
  timestamps: false,
});

const Review = sequelize.define('review', reviewSchema, {
  underscored: true,
  timestamps: false,
});

module.exports = { sequelize, Distribusi, Review };
