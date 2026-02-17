const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { submitComplaint } = require("../controllers/complaintController");

router.post("/", verifyToken, submitComplaint);

// console.log("verifyToken:", verifyToken);
// console.log("submitComplaint:", submitComplaint);


module.exports = router;
