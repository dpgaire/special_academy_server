const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshToken, logout } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;


