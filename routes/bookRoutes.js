const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/', authenticateToken, authorize('admin'), bookController.createBook);
router.put('/:id', authenticateToken, authorize('admin'), bookController.updateBook);
router.delete('/:id', authenticateToken, authorize('admin'), bookController.deleteBook);

module.exports = router;