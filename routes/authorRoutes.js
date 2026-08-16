// routes/authorRoutes.js

const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");

router.post("/", AuthorController.createAuthor);       // CREATE
router.get("/", AuthorController.getAllAuthors);        // READ (all)
router.get("/:id", AuthorController.getAuthorById);     // READ (by id)
router.put("/:id", AuthorController.updateAuthor);      // UPDATE
router.delete("/:id", AuthorController.deleteAuthor);   // DELETE

module.exports = router;
