require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const statsRoutes = require("./routes/statsRoutes");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');



connectDB();

const app = express();

const allowedOrigins = [
  "https://special-academy-admin-dashboard.vercel.app",
  "http://localhost:5173",
  "http://localhost:5000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // ✅ Allow requests with no origin (Postman, curl, mobile apps, server-to-server)
      if (!origin) return callback(null, true);

      // ✅ Check if request origin is allowed
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❌ Reject
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true, // needed if sending cookies/authorization headers
  })
);

app.use(express.json()); // Body parser
// app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/stats", statsRoutes);

const swaggerUiOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: 'https://unpkg.com/swagger-ui-dist@5.17.0/swagger-ui.css',
  customJs: [
    'https://unpkg.com/swagger-ui-dist@5.17.0/swagger-ui-bundle.js',
    'https://unpkg.com/swagger-ui-dist@5.17.0/swagger-ui-standalone-preset.js'
  ]
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

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
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ✅ Global error handler
app.use((err, req, res) => {
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