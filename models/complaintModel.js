const db = require("../config/db");

const createComplaint = async (complaintData) => {
  const query = `
    INSERT INTO complaints
    (user_id, complaint_type, is_anonymous, title, description, tracking_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    complaintData.user_id,
    complaintData.complaint_type,
    complaintData.is_anonymous,
    complaintData.title,
    complaintData.description,
    complaintData.tracking_id
  ];

  const result = await db.execute(query, values);
  return result;
};

const getAllComplaints = async () => {
  const query = `
    SELECT  * FROM complaints
    ORDER BY created_at DESC
  `;
  
  const [rows] = await db.execute(query);
  return rows;
};



module.exports = { 
  createComplaint,
  getAllComplaints
};
