const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/statsController");
const { protect, authorize } = require("../middleware/authMiddleware");

const cache = require("../middleware/cacheMiddleware");

router.get("/", protect, authorize(["admin"]), cache(3600), getStats);

module.exports = router;
