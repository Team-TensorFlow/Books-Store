const { pool } = require('../config/db');

function sanitize(user) {
  if (!user) return user;
  const { password, ...safeUser } = user;
  return safeUser;
}

class UserModel {
  static async create({ name, email, password, role = 'user' }) {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [name, email, password, role]);
    return this.findById(result.insertId);
  }

  static async findAll() {
    const query = 'SELECT * FROM users ORDER BY id DESC';
    const [rows] = await pool.query(query);
    return rows.map(sanitize);
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? sanitize(rows[0]) : null;
  }

  static async findByEmailWithPassword(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const name = data.name !== undefined ? data.name : existing.name;
    const email = data.email !== undefined ? data.email : existing.email;
    const role = data.role !== undefined ? data.role : existing.role;

    const query = `
      UPDATE users
      SET name = ?, email = ?, role = ?
      WHERE id = ?
    `;
    await pool.execute(query, [name, email, role, id]);
    return this.findById(id);
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;