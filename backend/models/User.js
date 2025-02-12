const pool = require("../config/db");

const User = {
  create: async (email, password) => {
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email.email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT id, email, createdAt FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await pool.query("SELECT id, email, createdAt FROM users");
    return rows;
  }
};

module.exports = User;
