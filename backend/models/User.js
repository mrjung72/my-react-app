const pool = require("../config/db");

const User = {
  create: async (email, password) => {
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result.insertId; // 생성된 사용자 ID 반환
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email.email]);
    return rows[0]; // 첫 번째 결과 반환
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT id, email, createdAt FROM users WHERE id = ?", [id]);
    return rows[0]; // 첫 번째 결과 반환
  }
};

module.exports = User;
