const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const {
  registerValidation,
  updateUserValidation,
} = require("../utils/validation");

router.get("/", protect, authorize(["admin"]), getUsers);
router.post("/", protect, authorize(["admin"]), registerValidation, createUser);
router.get("/:id", protect, authorize(["admin"]), getUserById);
router.put("/:id", protect, authorize(["admin"]), updateUserValidation, updateUser);
router.delete("/:id", protect, authorize(["admin"]), deleteUser);

module.exports = router;


