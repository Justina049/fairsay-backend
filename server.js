const express = require("express");
const cors = require("cors");
require("dotenv").config();

// connect to database
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FairSay API Running");
});

// Example test route
app.get("/test", (req, res) => {
  res.send("Test route working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
