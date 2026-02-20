const db = require("../config/db");

const createResetToken = async (userId, token, expiresAt) => {
  await db.execute(
    "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );
};

const findResetToken = async (token) => {
  const [rows] = await db.execute(
    "SELECT * FROM password_reset_tokens WHERE token = ? AND used = FALSE",
    [token]
  );
  return rows[0];
};

const markTokenUsed = async (id) => {
  await db.execute(
    "UPDATE password_reset_tokens SET used = TRUE WHERE id = ?",
    [id]
  );
};

module.exports = {
  createResetToken,
  findResetToken,
  markTokenUsed,
};
