const db = require("../config/db");

const createUser = (name, email, hashedPassword, role = "user") => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
