const { createComplaint, getAllComplaints, getComplaintsByUser } = require("../models/complaintModel");
const { v4: uuidv4 } = require("uuid");

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


exports.getAllComplaints = async (req, res) => {
  
  try {
    let complaints;
    
    if (req.user.role === "admin") {
      complaints = await getAllComplaints();
    } else {
      complaints = await getComplaintsByUser(req.user.id);
    }

    res.json({
      message: "complaints fetched successfully",
      complaints
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
