// const db = require("../config/db");

// const checkModuleAccess = async (req, res, next) => {
//   const userId = req.user.id;
//   const { module_id } = req.params;

//   const [moduleRows] = await db.execute(
//     "SELECT course_id, module_order FROM modules WHERE id = ?",
//     [module_id]
//   );

//   if (!moduleRows.length) {
//     return res.status(404).json({ message: "Module not found" });
//   }

//   const { course_id, module_order } = moduleRows[0];

//   if (module_order === 1) return next();

//   const [previousModule] = await db.execute(
//     "SELECT id FROM modules WHERE course_id = ? AND module_order = ?",
//     [course_id, module_order - 1]
//   );

//   if (!previousModule.length) return next();

//   const previousModuleId = previousModule[0].id;

//   const [quiz] = await db.execute(
//     "SELECT id FROM quizzes WHERE module_id = ?",
//     [previousModuleId]
//   );

//   if (!quiz.length) return next();

//   const quizId = quiz[0].id;

//   const [attempt] = await db.execute(
//     "SELECT * FROM quiz_attempts WHERE user_id = ? AND quiz_id = ? AND passed = TRUE",
//     [userId, quizId]
//   );

//   if (!attempt.length) {
//     return res.status(403).json({
//       message: "You must pass previous module quiz first",
//     });
//   }

//   next();
// };

// module.exports = { checkModuleAccess };