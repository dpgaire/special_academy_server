const ActivityLog = require('../models/ActivityLog');
const useragent = require('useragent');

const logActivity = async (adminId, action, entity, entityId, req) => {
  try {
    const log = new ActivityLog({
      adminId,
      action,
      entity,
      entityId,
      device: useragent.parse(req.headers['user-agent']).toString(),
      ipAddress: req.ip,
    });
    await log.save();
  } catch (err) {
    console.error(`Error logging activity for ${entity} ${action}:`, err);
  }
};

module.exports = logActivity;
