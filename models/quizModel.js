const db = require("../config/db");

const createQuiz = async (module_id, pass_mark) => {
  const [result] = await db.execute(
    "INSERT INTO quizzes (module_id, pass_mark) VALUES (?, ?)",
    [module_id, pass_mark]
  );
  return result.insertId;
};

const getQuizByModule = async (module_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM quizzes WHERE module_id = ?",
    [module_id]
  );
  return rows[0];
};

module.exports = { createQuiz, getQuizByModule };