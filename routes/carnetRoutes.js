const express = require('express');
const router = express.Router();
const carnetController = require('../controllers/carnetController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/carnet', ensureAuthenticated, carnetController.showCarnet);

module.exports = router;