const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/statsController");
const { protect, authorize } = require("../middleware/authMiddleware");

const cache = require("../middleware/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       properties:
 *         users:
 *           type: integer
 *           description: The total number of users
 *         categories:
 *           type: integer
 *           description: The total number of categories
 *         subcategories:
 *           type: integer
 *           description: The total number of subcategories
 *         items:
 *           type: integer
 *           description: The total number of items
 *       example:
 *         users: 10
 *         categories: 5
 *         subcategories: 15
 *         items: 50
 */

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: The stats managing API
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Returns the statistics of the application
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The statistics of the application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stats'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 */
router.get("/", protect, authorize(["admin"]), cache(3600), getStats);

module.exports = router;
