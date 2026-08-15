const { pool } = require('../config/db');

class BookModel {
  // Create a new book record
  static async create({ title, author, price, genre = null, published_year = null }) {
    const query = `
      INSERT INTO books (title, author, price, genre, published_year)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      title,
      author,
      price,
      genre,
      published_year
    ]);
    return this.findById(result.insertId);
  }

  // Retrieve all books
  static async findAll() {
    const query = 'SELECT * FROM books ORDER BY id DESC';
    const [rows] = await pool.query(query);
    return rows;
  }

  // Retrieve a single book by ID
  static async findById(id) {
    const query = 'SELECT * FROM books WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // Update a book by ID
  static async update(id, { title, author, price, genre = null, published_year = null }) {
    const query = `
      UPDATE books
      SET title = ?, author = ?, price = ?, genre = ?, published_year = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [
      title,
      author,
      price,
      genre,
      published_year,
      id
    ]);

    if (result.affectedRows === 0) {
      return null;
    }
    return this.findById(id);
  }

  // Delete a book by ID
  static async delete(id) {
    const query = 'DELETE FROM books WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = BookModel;
