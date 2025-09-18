const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/activityLogController');
const { protect, authorize } = require('../middleware/authMiddleware');

const cache = require("../middleware/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityLog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the activity log
 *         adminId:
 *           type: string
 *           description: The id of the admin who performed the action
 *         action:
 *           type: string
 *           description: The action performed
 *           enum: [create, update, delete, login, logout]
 *         entity:
 *           type: string
 *           description: The entity on which the action was performed
 *           enum: [user, category, item, subcategory]
 *         entityId:
 *           type: string
 *           description: The id of the entity
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time the action was performed
 *         device:
 *           type: string
 *           description: The device used to perform the action
 *         ipAddress:
 *           type: string
 *           description: The IP address from which the action was performed
 *       example:
 *         _id: 60d0fe4f5311236168a109ce
 *         adminId: 60d0fe4f5311236168a109ca
 *         action: create
 *         entity: item
 *         entityId: 60d0fe4f5311236168a109cd
 *         timestamp: 2021-06-21T15:00:00.000Z
 *         device: Chrome 91.0.4472 / Mac OS X 10.15.7
 *         ipAddress: ::1
 */

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: The activity logs managing API
 */

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Returns the list of all the activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityLog'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 */
router.get('/', protect, authorize(["admin"]), cache(3600), getLogs);

module.exports = router;

