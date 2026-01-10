const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");



const app = express();


/**
 * Global Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// const { protect } = require("./middleware/auth.middleware");

// app.get("/api/protected", protect, (req, res) => {
//   res.json({
//     message: "Access granted",
//     user: req.user
//   });
// });


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
