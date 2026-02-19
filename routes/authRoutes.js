const express = require("express");
const router = express.Router();
const { register, login, verifyEmail, updateProfile } = require("../controllers/authController");

// const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.put("/profile", verifyToken, updateProfile);


module.exports = router;
