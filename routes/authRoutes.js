const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Route for User Registration
router.post('/register', AuthController.register);

// Route for User Login
router.post('/login', AuthController.login);

module.exports = router;
