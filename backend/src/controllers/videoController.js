const Video = require("../models/video");
const { processVideo } = require("../utils/videoProcessor");

/**
 * @route   POST /api/videos/upload
 * @desc    Upload a video
 * @access  Editor/Admin
 */
const uploadVideo = async (req, res) => {
  try {
    // Multer puts file info in req.file
    if (!req.file) {
      return res.status(400).json({
        message: "No video file uploaded"
      });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Video title is required"
      });
    }

    // Create video document
    const video = await Video.create({
      title,
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      owner: req.user._id,
      status: "uploaded",
      sensitivity: "pending",
      progress: 0
    });
processVideo(video._id);
    res.status(201).json({
      message: "Video uploaded successfully",
      video
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading video"
    });
  }
};
// Start video processing asynchronously



module.exports = { uploadVideo };
