const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { submitComplaint, getAllComplaints,  getComplaint, updateComplaintStatus } = require("../controllers/complaintController");

router.post("/", verifyToken, submitComplaint);
router.get("/", verifyToken, getAllComplaints);
router.get("/:tracking_id", verifyToken, getComplaint);
router.patch("/:tracking_id/status", verifyToken, updateComplaintStatus);

module.exports = router;
