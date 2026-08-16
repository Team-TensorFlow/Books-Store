const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'bookuser',
  password: process.env.DB_PASSWORD || 'bookpassword',
  database: process.env.DB_NAME || 'books_store_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB(retries = 30, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to MySQL Database successfully!');

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          genre VARCHAR(100),
          published_year INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;

      await connection.query(createTableQuery);
      console.log('Database schema verified: `books` table ready.');

      const createAuthorsTableQuery = `
        CREATE TABLE IF NOT EXISTS authors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          bio TEXT,
          nationality VARCHAR(100),
          birth_year INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;

      await connection.query(createAuthorsTableQuery);
      console.log('Database schema verified: `authors` table ready.');

      connection.release();
      return;
    } catch (err) {
      console.log(`Database connection attempt ${i + 1}/${retries} failed: ${err.message}. Retrying in ${delay / 1000}s...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  console.error('Could not connect to MySQL after maximum retries.');
}

module.exports = { pool, initDB };