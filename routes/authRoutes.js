const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshToken,
  logout,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../utils/validation");

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;


