const express = require('express');
const router = express.Router();
const deploymentsController = require('../controllers/deploymentsController');

// Define the /api/deployments endpoint
router.get('/', deploymentsController.getDeployments);

module.exports = router;