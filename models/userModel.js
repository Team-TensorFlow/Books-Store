const { pool } = require('../config/db');

class UserModel {
  // Create a new user record
  static async create({ name, email, role = 'user' }) {
    const query = `
      INSERT INTO users (name, email, role)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      name,
      email,
      role
    ]);
    return this.findById(result.insertId);
  }

  // Retrieve all users
  static async findAll() {
    const query = 'SELECT * FROM users ORDER BY id DESC';
    const [rows] = await pool.query(query);
    return rows;
  }

  // Retrieve a single user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // Update a user by ID
  static async update(id, { name, email, role = 'user' }) {
    const query = `
      UPDATE users
      SET name = ?, email = ?, role = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [
      name,
      email,
      role,
      id
    ]);

    if (result.affectedRows === 0) {
      return null;
    }
    return this.findById(id);
  }

  // Delete a user by ID
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;