const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'login', 'logout'],
  },
  entity: {
    type: String,
    required: true,
    enum: ['user', 'category', 'item', 'subcategory'],
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  device: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
