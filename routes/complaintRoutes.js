const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { submitComplaint, getAllComplaints } = require("../controllers/complaintController");

router.post("/", verifyToken, submitComplaint);
router.get("/", verifyToken, getAllComplaints);


module.exports = router;
