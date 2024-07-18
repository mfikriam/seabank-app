const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getDistribusiPage);
router.get('/distribusi', viewController.getDistribusiPage);
router.get('/review', viewController.getReviewPage);

module.exports = router;
