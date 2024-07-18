const express = require('express');
const distribusiController = require('../controllers/distribusiController');

const router = express.Router();

router.route('/').get(distribusiController.getAllDistribusi).post(distribusiController.createDistribusi);

router
  .route('/:id')
  .get(distribusiController.getDistribusi)
  .patch(distribusiController.updateDistribusi)
  .delete(distribusiController.deleteDistribusi);

module.exports = router;
