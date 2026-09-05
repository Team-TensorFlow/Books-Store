const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, authorize('admin'), userController.getAllUsers);

router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);

router.delete('/:id', authenticateToken, authorize('admin'), userController.deleteUser);

module.exports = router;