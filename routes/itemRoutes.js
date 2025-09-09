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

router.post(
  "/",
  protect,
  authorize(["admin"]),
  itemValidation,
  createItem
);
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  itemValidation,
  updateItem
);
router.delete("/:id", protect, authorize(["admin"]), deleteItem);

module.exports = router;
