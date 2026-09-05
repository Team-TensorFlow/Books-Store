const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

// Routes mapped to controllers
router.post('/', authenticateUser, authorizeRole('admin'), bookController.createBook);       // Create
router.get('/', bookController.getAllBooks);       // Read All
router.get('/:id', bookController.getBookById);    // Read by ID
router.put('/:id', authenticateUser, authorizeRole('admin'), bookController.updateBook);     // Update
router.delete('/:id', authenticateUser, authorizeRole('admin'), bookController.deleteBook);  // Delete

module.exports = router;
