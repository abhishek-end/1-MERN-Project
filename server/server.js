const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000; // Provide a fallback port

// CORS setup: Restrict to your frontend domain in production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const conn = require("./db/connection.js");

// Routes
app.use(require("./Routes/Route"));

// Start server after DB connection
conn
  .then((db) => {
    if (!db) return process.exit(1);

    // Listen to HTTP server only when we have a valid DB connection
    app.listen(port, () => {
      console.log(`Server is running on Port: http://localhost:${port} 🔏`);
    });

    app.on("error", (err) =>
      console.log(`Failed to connect with HTTP Server: ${err}`)
    );
  })
  .catch((error) => {
    console.error(`Connection to MongoDB failed: ${error}`);
    process.exit(1); // Exit with failure if DB connection fails
  });

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Graceful shutdown on SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server");
  app.close(() => {
    console.log("HTTP server closed");
  });
});
