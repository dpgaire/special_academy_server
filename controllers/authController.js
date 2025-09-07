const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const {fullName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    if (user) {
      const accessToken = generateToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log('req login',req.body)
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Response
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const refreshToken = async (req, res) => {
  const { refreshToken: refreshTokenFromBody } = req.body;

  if (!refreshTokenFromBody) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshTokenFromBody, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshTokenFromBody) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = generateToken(user._id, user.role);

    // (Optional but recommended) Rotate refresh token
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken, refreshToken: newRefreshToken }); // return both
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


const logout = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, refreshToken, logout };


