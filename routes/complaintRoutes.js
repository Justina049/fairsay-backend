const express = require("express");
const router = express.Router();

// Middleware
const verifyToken = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Controller
const {
  createDraftComplaint,
  updateStep2,
  addComplaintParties,
  uploadEvidence,
  submitComplaint,
  getMyComplaints,
  getComplaint
} = require("../controllers/complaintController");


// Step 1: Create the initial draft
router.post("/", verifyToken, createDraftComplaint);

// Step 2: Update incident details (Date, Location, etc.)
router.put("/:id/step-2", verifyToken, updateStep2);

// Step 3: Add parties involved (Accused, Witnesses)
router.post("/:id/parties", verifyToken, addComplaintParties);

// Step 4: Upload multiple evidence files (Cloudinary)
router.post("/:id/evidence", verifyToken, upload.array("files", 5), uploadEvidence);

// Step 5: Final Submission (Generates Tracking ID and closes editing)
router.post("/:id/submit", verifyToken, submitComplaint);



// Get all complaints for the logged-in user
router.get("/my-list", verifyToken, getMyComplaints);

// Get a specific complaint by Tracking ID
router.get("/track/:id", verifyToken, getComplaint);

module.exports = router;