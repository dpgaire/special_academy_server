require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

const allowedOrigins = [
  "https://special-academy-admin-dashboard.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl or mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if using cookies, Authorization headers, etc.
  })
);

app.use(express.json()); // Body parser


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

// Mount routes
app.use("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Special Academy API</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
          text-align: center;
        }
        .container {
          background: rgba(0, 0, 0, 0.4);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Welcome to the API</h1>
        <p>Special Academy Backend is running successfully 🎉</p>
      </div>
    </body>
    </html>
  `);
});

// ✅ 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.message === "CORS_NOT_ALLOWED") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed by CORS",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




module.exports = app;

