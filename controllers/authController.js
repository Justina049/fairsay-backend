const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  updateLastLogin,
  approveUser
} = require("../models/userModel");
const crypto = require("crypto");
const emailToken = crypto.randomBytes(20).toString("hex");


// REGISTER
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await createUser(first_name, last_name, email, hashedPassword, "user", emailToken);

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email_verification_token = ?",
    [token]
  );

  if (!rows[0]) return res.status(400).json({ message: "Invalid token" });

  await db.execute(
    "UPDATE users SET email_verified = TRUE, email_verification_token = NULL WHERE id = ?",
    [rows[0].id]
  );

  res.json({ message: "Email verified successfully" });
};



// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if email is verified
    if (!user.email_verified) {
      return res.status(403).json({ message: "Please verify your email before login" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }


    // Update last login
    await updateLastLogin(user.id);

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        profile_completed: user.profile_completed,
        verification_status: user.verification_status
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// updateUserProfile
const { updateUserProfile } = require("../models/userModel");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await updateUserProfile(userId, req.body);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID of user to approve
    const superAdminId = req.user.id; // ID of super admin from JWT

    await approveUser(userId, superAdminId);

    res.json({ message: "User verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




