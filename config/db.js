const mysql = require("mysql2");

const db = mysql.createConnection({
//   host: "localhost",
  host : '127.0.0.1',
  user: "justina",
  password: "",
  database: "fairsay_db",
  connectionLimit : 10,
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
