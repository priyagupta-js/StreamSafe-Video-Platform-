const Video = require("../models/Video");
const { processVideo } = require("../utils/videoProcessor");
const fs = require("fs");
const path = require("path");

/**
 * @route   POST /api/videos/upload
 * @desc    Upload a video
 * @access  Editor/Admin
 */
const uploadVideo = async (req, res) => {
  try {
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

    // Start video processing asynchronously
    processVideo(video._id);

    res.status(201).json({
      message: "Video uploaded successfully",
      video
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading video"
    });
  }
};

/**
 * @route   GET /api/videos/stream/:id
 * @desc    Stream video using range requests
 * @access  Private (Owner only)
 */
const streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Ownership check (multi-tenant isolation)
    if (video.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Allow streaming only after processing
    if (video.status !== "completed") {
      return res.status(400).json({
        message: "Video is still processing"
      });
    }

    const videoPath = path.resolve(video.filepath);
    const videoSize = fs.statSync(videoPath).size;
    const range = req.headers.range;

    if (!range) {
      return res.status(416).send("Range header required");
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": video.mimetype
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error streaming video"
    });
  }
};

/**
 * @route   GET /api/videos
 * @desc    Get all videos for logged-in user
 * @access  Private
 */
const getUserVideos = async (req, res) => {
  try {
    const { status, sensitivity } = req.query;

    const query = {
      owner: req.user._id
    };

    if (status) query.status = status;
    if (sensitivity) query.sensitivity = sensitivity;

    const videos = await Video.find(query).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching videos"
    });
  }
};


module.exports = {
  uploadVideo,
  streamVideo,
   getUserVideos
};
