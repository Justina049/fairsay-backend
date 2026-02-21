const db = require("../config/db");

const approveUser = async (userId, superAdminId) => {
  await db.execute(
    `UPDATE employee_verifications
     SET status = 'approved',
         reviewed_by = ?,
         reviewed_at = NOW()
     WHERE user_id = ?`,
    [superAdminId, userId]
  );
};

module.exports = { approveUser };
