const db = require("../config/db");

// Create a new complaint
const createComplaint = async (complaintData) => {
  const query = `
    INSERT INTO complaints
    (user_id, complaint_type, is_anonymous, title, description, tracking_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    complaintData.user_id,
    complaintData.complaint_type,
    complaintData.is_anonymous ? 1 : 0, // store 0/1
    complaintData.title,
    complaintData.description,
    complaintData.tracking_id
  ];

  const [result] = await db.execute(query, values);
  return result;
};

// Get all complaints (Admin)
const getAllComplaints = async () => {
  const query = `SELECT * FROM complaints ORDER BY created_at DESC`;
  const [rows] = await db.execute(query);
  return rows;
};

// Get complaints by specific user
const getComplaintsByUser = async (userId) => {
  const query = `
    SELECT * FROM complaints
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;
  const [rows] = await db.execute(query, [userId]);
  return rows;
};

// Get complaint by tracking ID
const getComplaintByTrackingId = async (trackingId) => {
  const query = `
    SELECT * FROM complaints
    WHERE tracking_id = ?
  `;
  const [rows] = await db.execute(query, [trackingId]);
  return rows[0] || null; // single complaint or null
};

// Update complaint status
const updateComplaintStatus = async (trackingId, status) => {
  const query = `
    UPDATE complaints
    SET status = ?
    WHERE tracking_id = ?
  `;
  const [result] = await db.execute(query, [status, trackingId]);
  return result;
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintsByUser,
  getComplaintByTrackingId,
  updateComplaintStatus
};
