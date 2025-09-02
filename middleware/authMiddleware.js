const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      accessToken = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      // Handle hardcoded admin user
      if (!req.user && decoded.id === "admin" && decoded.role === "admin") {
        req.user = {
          _id: "admin",
          fullName: "Admin User",
          email: "admin",
          role: "admin",
        };
      }

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!accessToken) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Not authorized, insufficient role" });
  }
  next();
};

module.exports = { protect, authorize };


