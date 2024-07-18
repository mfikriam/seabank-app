const { Distribusi } = require('../models');
const factory = require('./handlerFactory');

exports.getAllDistribusi = factory.findAll(Distribusi);
exports.createDistribusi = factory.createOne(Distribusi);
exports.getDistribusi = factory.findOne(Distribusi);
exports.updateDistribusi = factory.updateOne(Distribusi);
exports.deleteDistribusi = factory.deleteOne(Distribusi);
