const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");


// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
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
    await createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } =req.body;

    // Validate Input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check user
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const validPasword = await bcrypt.compare(password, user.password);

    if (!validPasword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful",
      token,
      user : {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};