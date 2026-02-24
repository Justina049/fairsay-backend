// // const mysql = require("mysql2");
// const mysql = require("mysql2/promise");


// const db = mysql.createPool({
//   host : '127.0.0.1',
//   user: "justina",
//   password: "Justina123$",
//   database: "Fairsaydb",
//   waitForConnections: true,
//   connectionLimit : 10,
//   queueLimit: 0
// });

// // db.connect(err => {
// //   if (err) {
// //     console.error("Database connection failed:", err);
// //   } else {
// //     console.log("MySQL Connected");
// //   }
// // });
// console.log("MySQL Connected");

// module.exports = db;


const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  queueLimit: 0,
});

console.log("MySQL Pool Created");

module.exports = db;
