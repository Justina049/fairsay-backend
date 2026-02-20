// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const {
//   createUser,
//   findUserByEmail,
//   updateLastLogin,
//   approveUser,
//   updateUserProfile
// } = require("../models/userModel");
// const crypto = require("crypto");
// const emailToken = crypto.randomBytes(20).toString("hex");
// const { createResetToken, findResetToken, markTokenUsed } = require("../models/passwordResetModel");
// const db = require("../config/db");


// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password } = req.body;

//     // Validate input
//     if (!first_name || !last_name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user
//     await createUser(first_name, last_name, email, hashedPassword, "user", emailToken);

//     res.status(201).json({
//       message: "User registered successfully",
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   const [rows] = await db.execute(
//     "SELECT * FROM users WHERE email_verification_token = ?",
//     [token]
//   );

//   if (!rows[0]) return res.status(400).json({ message: "Invalid token" });

//   await db.execute(
//     "UPDATE users SET email_verified = TRUE, email_verification_token = NULL WHERE id = ?",
//     [rows[0].id]
//   );

//   res.json({ message: "Email verified successfully" });
// };



// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await findUserByEmail(email);

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Check if email is verified
//     if (!user.email_verified) {
//       return res.status(403).json({ message: "Please verify your email before login" });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Update last login
//     await updateLastLogin(user.id);

//     // Create JWT
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         role: user.role,
//         profile_completed: user.profile_completed,
//         verification_status: user.verification_status
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // updateUserProfile
// exports.updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await updateUserProfile(userId, req.body);

//     res.json({ message: "Profile updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.verifyUser = async (req, res) => {
//   try {
//     const { userId } = req.params; // ID of user to approve
//     const superAdminId = req.user.id; // ID of super admin from JWT

//     await approveUser(userId, superAdminId);

//     res.json({ message: "User verified successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await findUserByEmail(email);

//     // Always respond with same message to avoid email enumeration
//     if (!user) {
//       return res.json({ message: "If email exists, reset link sent" });
//     }

//     const token = crypto.randomBytes(32).toString("hex");
//     const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

//     await createResetToken(user.id, token, expiresAt);

//     // For now we log the link; later you can email it
//     console.log(`Reset password link: http://localhost:5000/api/auth/reset-password/${token}`);

//     res.json({ message: "If email exists, reset link sent" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const record = await findResetToken(token);

//     if (!record || new Date(record.expires_at) < new Date()) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.execute(
//       "UPDATE users SET password = ? WHERE id = ?",
//       [hashedPassword, record.user_id]
//     );

//     await markTokenUsed(record.id);

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  createUser,
  findUserByEmail,
  updateLastLogin,
  approveUser,
  updateUserProfile
} = require("../models/userModel");

const {
  createResetToken,
  findResetToken,
  markTokenUsed
} = require("../models/passwordResetModel");


  //  REGISTER
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token PER USER
    const emailToken = crypto.randomBytes(20).toString("hex");

    await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      "user",
      emailToken
    );

    res.status(201).json({
      message: "User registered successfully. Please verify your email."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



  //  VERIFY EMAIL

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email_verification_token = ?",
      [token]
    );

    if (!rows[0]) {
      return res.status(400).json({ message: "Invalid token" });
    }

    await db.execute(
      "UPDATE users SET email_verified = TRUE, email_verification_token = NULL WHERE id = ?",
      [rows[0].id]
    );

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



  //  LOGIN
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

    if (!user.email_verified) {
      return res.status(403).json({ message: "Please verify your email before login" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    await updateLastLogin(user.id);

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


  //  UPDATE PROFILE
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



  //  SUPER ADMIN VERIFY USER
exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const superAdminId = req.user.id;

    await approveUser(userId, superAdminId);

    res.json({ message: "User verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



  //  FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    // Prevent email enumeration
    if (!user) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await createResetToken(user.id, token, expiresAt);

    console.log(
      `Reset password link: http://localhost:5000/api/auth/reset-password/${token}`
    );

    res.json({ message: "If email exists, reset link sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

  //  RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const record = await findResetToken(token);

    if (!record || new Date(record.expires_at) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, record.user_id]
    );

    await markTokenUsed(record.id);

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};