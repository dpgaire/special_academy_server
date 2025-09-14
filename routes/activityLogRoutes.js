const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/activityLogController');
const { protect } = require('../middleware/authMiddleware');

const cache = require("../middleware/cacheMiddleware");

// GET all activity logs
router.get('/', protect, cache(3600), getLogs);

module.exports = router;
