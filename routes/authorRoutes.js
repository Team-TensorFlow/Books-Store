const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

router.get("/", AuthorController.getAllAuthors);
router.get("/:id", AuthorController.getAuthorById);

router.post("/", authenticateToken, authorize('admin'), AuthorController.createAuthor);
router.put("/:id", authenticateToken, authorize('admin'), AuthorController.updateAuthor);
router.delete("/:id", authenticateToken, authorize('admin'), AuthorController.deleteAuthor);

module.exports = router;