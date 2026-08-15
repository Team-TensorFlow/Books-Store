const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Routes mapped to controllers
router.post('/', bookController.createBook);       // Create
router.get('/', bookController.getAllBooks);       // Read All
router.get('/:id', bookController.getBookById);    // Read by ID
router.put('/:id', bookController.updateBook);     // Update
router.delete('/:id', bookController.deleteBook);  // Delete

module.exports = router;
