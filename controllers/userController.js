const db = require("../config/db");

exports.courseProgress = async (req, res) => {
  const { lessonsCompleted } = req.body;

  try {
    //hardcording completed for now
    const completed = lessonsCompleted >= 4;

    await db.query(
      "UPDATE users SET lessons_completed = ?, course_completed = ? WHERE id = ?",
      [lessonsCompleted, completed, req.user.id]
    );

    res.json({ success: true, completed });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};