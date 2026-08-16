const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes mapped to controllers
router.post('/', userController.createUser);       // Create
router.get('/', userController.getAllUsers);       // Read All
router.get('/:id', userController.getUserById);    // Read by ID
router.put('/:id', userController.updateUser);     // Update
router.delete('/:id', userController.deleteUser);  // Delete

module.exports = router;