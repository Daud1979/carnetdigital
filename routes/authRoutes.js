const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.showLogin);
router.get('/login', authController.showLogin);
router.post('/credenciales', authController.login);
router.get('/credenciales', authController.login);
router.get('/logout', authController.logout);
router.get('/carnet/:id', authController.getCarnetPorId);
module.exports = router;