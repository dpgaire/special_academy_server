const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");
const { subcategoryValidation } = require("../utils/validation");

const cache = require("../middleware/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       required:
 *         - name
 *         - category_id
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the subcategory
 *         name:
 *           type: string
 *           description: The name of the subcategory
 *         description:
 *           type: string
 *           description: The description of the subcategory
 *         category_id:
 *           type: string
 *           description: The id of the parent category
 *       example:
 *         _id: 60d0fe4f5311236168a109cc
 *         name: Algebra
 *         description: All about algebra
 *         category_id: 60d0fe4f5311236168a109cb
 */

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: The subcategories managing API
 */

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       201:
 *         description: The subcategory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
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
  subcategoryValidation,
  createSubcategory
);

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Returns the list of all the subcategories
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: The id of the category to filter by
 *     responses:
 *       200:
 *         description: The list of the subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.get("/", protect, cache(3600), getSubcategories);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   get:
 *     summary: Get the subcategory by id
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory id
 *     responses:
 *       200:
 *         description: The subcategory description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The subcategory was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", protect, cache(3600), getSubcategoryById);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update the subcategory by the id
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: The subcategory was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The subcategory was not found
 *       500:
 *         description: Some server error
 */
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  subcategoryValidation,
  updateSubcategory
);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Remove the subcategory by id
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory id
 *     responses:
 *       200:
 *         description: The subcategory was deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The subcategory was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", protect, authorize(["admin"]), deleteSubcategory);

module.exports = router;



