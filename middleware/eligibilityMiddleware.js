const db = require("../config/db");

const checkEligibility = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Replace with your actual eligibility quiz ID
    const ELIGIBILITY_QUIZ_ID = 1;

    const [rows] = await db.execute(
      "SELECT id FROM quiz_attempts WHERE user_id = ? AND quiz_id = ? AND passed = TRUE",
      [userId, ELIGIBILITY_QUIZ_ID]
    );

    if (!rows.length) {
      return res.status(403).json({
        message:
          "You must complete the required course before submitting a complaint.",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkEligibility };