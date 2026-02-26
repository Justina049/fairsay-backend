const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { upload } = require('../config/cloudinary'); // ← import upload middleware
const {
  submitVerification,
  approveVerification,
  rejectVerification
} = require('../controllers/employeeVerificationController');

// Employee submits verification (single file)
router.post('/submit', verifyToken, upload.single('file'), submitVerification);

// Admin approve/reject
router.put(
  '/admin/verify-user/:userId/approve',
  verifyToken,
  roleMiddleware('super_admin'),
  approveVerification
);

router.put(
  '/admin/verify-user/:userId/reject',
  verifyToken,
  roleMiddleware('super_admin'),
  rejectVerification
);

module.exports = router;
