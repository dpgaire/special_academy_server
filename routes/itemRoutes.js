const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");
const imgbbUpload = require("../middleware/imgbbUpload");
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
  upload.single("file"),
  imgbbUpload,
  itemValidation,
  createItem
);
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);
router.put(
  "/:id",
  protect,
  authorize(["admin"]),
  upload.single("file"),
  imgbbUpload,
  itemValidation,
  updateItem
);
router.delete("/:id", protect, authorize(["admin"]), deleteItem);

module.exports = router;


