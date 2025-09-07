const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { categoryValidation } = require("../utils/validation");

router.post("/", protect, authorize(["admin"]), categoryValidation, createCategory);
router.get("/", protect, getCategories);
router.get("/:id", protect, getCategoryById);
router.put("/:id", protect, authorize(["admin"]), categoryValidation, updateCategory);
router.delete("/:id", protect, authorize(["admin"]), deleteCategory);

module.exports = router;


