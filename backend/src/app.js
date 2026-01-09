const express = require("express");
const cors = require("cors");

const app = express();

/**
 * Global Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check Route
 * Used to verify server is running
 */
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "StreamSafe Backend is running"
  });
});

module.exports = app;
