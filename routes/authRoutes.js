const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

// Register administrator
router.post('/register', authController.register);

// Login administrator
router.post('/login', authController.login);

// Check if administrator exists
router.get('/check-admin', authController.checkAdmin);

module.exports = router;