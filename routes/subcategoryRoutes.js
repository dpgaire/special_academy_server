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

router.post(
  "/",
  protect,
  authorize(["admin"]),
  subcategoryValidation,
  createSubcategory
);
router.get("/", protect, getSubcategories);
router.get("/:id", protect, getSubcategoryById);
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  subcategoryValidation,
  updateSubcategory
);
router.delete("/:id", protect, authorize(["admin"]), deleteSubcategory);

module.exports = router;


