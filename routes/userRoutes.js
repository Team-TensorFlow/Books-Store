const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Public Auth Endpoints
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected CRUD Endpoints (Requires Login)
router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);

// Restricted Endpoint (Requires Admin Role)
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;