const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/activityLogController');
const { protect } = require('../middleware/authMiddleware');

// GET all activity logs
router.get('/', protect, getLogs);

module.exports = router;
