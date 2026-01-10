const express = require("express");
const { uploadVideo ,streamVideo ,getUserVideos  } = require("../controllers/videoController");
const upload = require("../utils/multer");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


const router = express.Router();

router.post(
  "/upload",
  protect,
  authorizeRoles("editor", "admin"),
  upload.single("video"),
  uploadVideo
);

router.get(
  "/stream/:id",
  protect,
  streamVideo
);

router.get("/", protect, getUserVideos);

module.exports = router;
