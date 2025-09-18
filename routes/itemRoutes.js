const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { itemValidation } = require("../utils/validation");

const cache = require("../middleware/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - subcategory_id
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: The name of the item
 *         description:
 *           type: string
 *           description: The description of the item
 *         subcategory_id:
 *           type: string
 *           description: The id of the parent subcategory
 *         type:
 *           type: string
 *           description: The type of the item
 *           enum: [pdf, youtube_url]
 *         file_path:
 *           type: string
 *           description: The path to the PDF file (if type is pdf)
 *         youtube_url:
 *           type: string
 *           description: The URL of the YouTube video (if type is youtube_url)
 *       example:
 *         _id: 60d0fe4f5311236168a109cd
 *         name: Introduction to Algebra
 *         description: A PDF document covering the basics of algebra.
 *         subcategory_id: 60d0fe4f5311236168a109cc
 *         type: pdf
 *         file_path: /uploads/algebra.pdf
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  protect,
  authorize(["admin"]),
  itemValidation,
  createItem
);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: string
 *         description: The id of the subcategory to filter by
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.get("/", protect, cache(3600), getItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", protect, cache(3600), getItemById);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update the item by the id
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  itemValidation,
  updateItem
);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", protect, authorize(["admin"]), deleteItem);

module.exports = router;

