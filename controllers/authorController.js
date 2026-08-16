// controllers/authorController.js
// Response shape mirrors bookController.js exactly: { success, message?, data }
// so the README/Postman format stays consistent across the whole team's API.

const AuthorModel = require("../models/authorModel");

function validateAuthorInput(body, { partial = false } = {}) {
  const errors = [];
  const { name, birth_year } = body;

  if (!partial || name !== undefined) {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("name is required and must be a non-empty string");
    }
  }
  if (birth_year !== undefined && (!Number.isInteger(Number(birth_year)) || Number(birth_year) < 0)) {
    errors.push("birth_year must be a valid integer year");
  }

  return errors;
}

const AuthorController = {
  // POST /api/authors
  async createAuthor(req, res) {
    try {
      const errors = validateAuthorInput(req.body);
      if (errors.length) {
        return res.status(400).json({ success: false, message: "Validation failed", errors });
      }

      const { name, bio, nationality, birth_year } = req.body;
      const author = await AuthorModel.create({ name: name.trim(), bio, nationality, birth_year });

      return res.status(201).json({
        success: true,
        message: "Author created successfully",
        data: author,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to create author" });
    }
  },

  // GET /api/authors
  async getAllAuthors(req, res) {
    try {
      const authors = await AuthorModel.findAll();
      return res.status(200).json({
        success: true,
        count: authors.length,
        data: authors,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to fetch authors" });
    }
  },

  // GET /api/authors/:id
  async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const author = await AuthorModel.findById(id);

      if (!author) {
        return res.status(404).json({ success: false, message: `Author with id ${id} not found` });
      }

      return res.status(200).json({ success: true, data: author });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to fetch author" });
    }
  },

  // PUT /api/authors/:id
  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const existing = await AuthorModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Author with id ${id} not found` });
      }

      const errors = validateAuthorInput(req.body, { partial: true });
      if (errors.length) {
        return res.status(400).json({ success: false, message: "Validation failed", errors });
      }

      const updated = await AuthorModel.update(id, req.body);
      return res.status(200).json({
        success: true,
        message: "Author updated successfully",
        data: updated,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to update author" });
    }
  },

  // DELETE /api/authors/:id
  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const existing = await AuthorModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Author with id ${id} not found` });
      }

      await AuthorModel.remove(id);
      return res.status(200).json({
        success: true,
        message: `Author with ID ${id} successfully deleted`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to delete author" });
    }
  },
};

module.exports = AuthorController;
