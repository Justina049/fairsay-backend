const express = require("express");
const cors = require("cors");
require("dotenv").config();
const aiRoutes = require("./routes/aiRoutes");

// connect to database
// require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
// AI chat endpoint
app.use("/api/ai", aiRoutes);


app.get("/", (req, res) => {
  res.send("FairSay API Running");
});

// Health / Ping Endpoint
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// app.use((err, req, res, next) => {
//   console.error("GLOBAL ERROR HANDLER:", err);

//   res.status(err.status || 500).json({
//     message: err.message || "Server Error"
//   });
// });