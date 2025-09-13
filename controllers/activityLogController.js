const ActivityLog = require('../models/ActivityLog');

// Get all activity logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('adminId', 'name');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
