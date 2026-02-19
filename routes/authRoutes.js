const express = require("express");
const router = express.Router();
const { register, login, verifyEmail, updateProfile } = require("../controllers/authController");

// const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { verifyUser } = require("../controllers/authController"); 
router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.put("/profile", verifyToken, updateProfile);
router.put(
  "/admin/verify-user/:userId",
  verifyToken,
  roleMiddleware(["super_admin"]),
  verifyUser
);


module.exports = router;
