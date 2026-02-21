const {
  createComplaint,
  getAllComplaints,
  getComplaintsByUser,
  getComplaintByTrackingId,
  updateComplaintStatus
} = require("../models/complaintModel");

const { v4: uuidv4 } = require("uuid");

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { complaint_type, title, description, is_anonymous } = req.body;

    if (!complaint_type || !title || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const complaintData = {
      user_id: req.user.id,
      complaint_type,
      title,
      description,
      is_anonymous: is_anonymous || false,
      tracking_id: uuidv4()
    };

    await createComplaint(complaintData);

    res.status(201).json({
      message: "Complaint submitted successfully",
      tracking_id: complaintData.tracking_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all complaints (Admin sees all, user sees their own)
exports.getAllComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await getAllComplaints();
    } else {
      complaints = await getComplaintsByUser(req.user.id);
    }

    // Optionally hide user_id if complaint is anonymous and requester is not admin
    complaints = complaints.map(c => ({
      ...c,
      user_id: c.is_anonymous && req.user.role !== "admin" ? null : c.user_id
    }));

    res.json({
      success: true,
      message: "Complaints fetched successfully",
      count: complaints.length,
      complaints
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single complaint by tracking ID
exports.getComplaint = async (req, res) => {
  try {
    const { tracking_id } = req.params;
    const complaint = await getComplaintByTrackingId(tracking_id);

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (req.user.role !== "admin" && complaint.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Hide user_id if anonymous and requester is not admin
    if (complaint.is_anonymous && req.user.role !== "admin") {
      complaint.user_id = null;
    }

    res.json({
      success: true,
      message: "Complaint fetched successfully",
      complaint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin updates complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { tracking_id } = req.params;
    const { status } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const allowedStatuses = ["pending", "in_progress", "resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const result = await updateComplaintStatus(tracking_id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ success: true, message: "Complaint status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
