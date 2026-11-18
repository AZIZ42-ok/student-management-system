const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

// Register administrator
router.post('/register', authController.register);

// Login administrator
router.post('/login', authController.login);

module.exports = router;