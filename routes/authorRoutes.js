// routes/authorRoutes.js

const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

router.post("/", authenticateUser, authorizeRole('admin'), AuthorController.createAuthor);       // CREATE
router.get("/", AuthorController.getAllAuthors);        // READ (all)
router.get("/:id", AuthorController.getAuthorById);     // READ (by id)
router.put("/:id", authenticateUser, authorizeRole('admin'), AuthorController.updateAuthor);      // UPDATE
router.delete("/:id", authenticateUser, authorizeRole('admin'), AuthorController.deleteAuthor);   // DELETE

module.exports = router;
