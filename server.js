const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const employeeVerificationRoutes = require('./routes/employeeVerificationRoutes');

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      process.env.FRONTEND_URL, // Production frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", progressRoutes);
// AI chat endpoint
app.use("/api/ai", aiRoutes);
app.use('/api/verification', employeeVerificationRoutes);

app.get("/", (req, res) => {
  res.send("FairSay API Running");
});

// Health / Ping Endpoint
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// GLOBAL ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("GLOBAL ERROR HANDLER:", err);

//   res.status(err.status || 500).json({
//     message: err.message || "Server Error"
//   });
// });