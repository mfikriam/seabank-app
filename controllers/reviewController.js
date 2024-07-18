const { Review } = require('../models');
const factory = require('./handlerFactory');

exports.getAllReview = factory.findAll(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.findOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
