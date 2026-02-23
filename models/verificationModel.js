const db = require("../config/db");

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
