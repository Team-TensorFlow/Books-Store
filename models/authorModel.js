// models/authorModel.js
// config/db.js exports { pool, initDB } — NOT pool directly. Destructure it.
// Table creation is NOT done here (that caused the race-condition bug the team
// already fixed once — querying before MySQL is ready). Instead, the `authors`
// CREATE TABLE statement is added into the shared initDB() retry loop in
// config/db.js (see instructions) so it runs only after MySQL is confirmed up.

const { pool } = require("../config/db");

const AuthorModel = {
  async create({ name, bio, nationality, birth_year }) {
    const [result] = await pool.query(
      `INSERT INTO authors (name, bio, nationality, birth_year) VALUES (?, ?, ?, ?)`,
      [name, bio || null, nationality || null, birth_year || null]
    );
    return this.findById(result.insertId);
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM authors ORDER BY id DESC");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async update(id, fields) {
    const allowed = ["name", "bio", "nationality", "birth_year"];
    const setClauses = [];
    const params = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(fields[key]);
      }
    }

    if (setClauses.length === 0) return this.findById(id);

    params.push(id);
    await pool.query(`UPDATE authors SET ${setClauses.join(", ")} WHERE id = ?`, params);
    return this.findById(id);
  },

  async remove(id) {
    const [result] = await pool.query("DELETE FROM authors WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = AuthorModel;
