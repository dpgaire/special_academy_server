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

router.post(
  "/",
  protect,
  authorize(["admin"]),
  itemValidation,
  createItem
);
router.get("/", protect, cache(3600), getItems);
router.get("/:id", protect, cache(3600), getItemById);
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  itemValidation,
  updateItem
);
router.delete("/:id", protect, authorize(["admin"]), deleteItem);

module.exports = router;
