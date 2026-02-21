const db = require("../config/db");

// const approveUser = async (userId, superAdminId) => {
//   return await db.execute(
//     `UPDATE employee_verifications
//      SET status = 'approved',
//          reviewed_by = ?,
//          reviewed_at = NOW()
//      WHERE user_id = ?`,
//     [superAdminId, userId]
//   );
// };

const approveUser = async (userId, superAdminId, notes = null) => {
  return await db.execute(
    `INSERT INTO employee_verifications
      (user_id, status, reviewed_by, reviewed_at, notes)
     VALUES (?, 'approved', ?, NOW(), ?)
     ON DUPLICATE KEY UPDATE
       status = 'approved',
       reviewed_by = VALUES(reviewed_by),
       reviewed_at = NOW(),
       notes = VALUES(notes)`,
    [userId, superAdminId, notes]
  );
};
module.exports = { approveUser };
