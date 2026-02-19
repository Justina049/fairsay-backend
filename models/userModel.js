// // Old version of code

// const db = require("../config/db");

// // Create user
// const createUser = async (name, email, hashedPassword, role = "user") => {
//   const [result] = await db.execute(
//     "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//     [name, email, hashedPassword, role]
//   );
//   return result;
// };

// // Find user by email
// const findUserByEmail = async (email) => {
//   const [rows] = await db.execute(
//     "SELECT * FROM users WHERE email = ?",
//     [email]
//   );
//   return rows[0];
// };

// module.exports = {
//   createUser,
//   findUserByEmail,
// };



const db = require("../config/db");

// Create user
const createUser = async (
  first_name,
  last_name,
  email,
  hashedPassword,
  role = "user",
  emailToken = null
) => {
  const [result] = await db.execute(
    `INSERT INTO users 
     (first_name, last_name, email, password, role, email_verification_token) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, hashedPassword, role, emailToken]
  );

  return result;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

// Update last login
const updateLastLogin = async (userId) => {
  await db.execute(
    "UPDATE users SET last_login_at = NOW() WHERE id = ?",
    [userId]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  updateLastLogin,
};
