const Video = require("../models/Video");

/**
 * Simulate video processing with progress updates
 */
const processVideo = async (videoId) => {
  let progress = 0;

  const interval = setInterval(async () => {
    try {
      progress += 10;

      // Update video progress
      const video = await Video.findByIdAndUpdate(
        videoId,
        {
          status: "processing",
          progress
        },
        { new: true }
      );

      // Emit progress update
      global.io.emit(`video-progress-${videoId}`, {
        videoId,
        progress,
        status: video.status
      });

      // Processing completed
      if (progress >= 100) {
        clearInterval(interval);

        const sensitivityResult =
          Math.random() > 0.3 ? "safe" : "flagged";

        const completedVideo = await Video.findByIdAndUpdate(
          videoId,
          {
            status: "completed",
            sensitivity: sensitivityResult,
            progress: 100
          },
          { new: true }
        );

        // Emit completion event
        global.io.emit(`video-completed-${videoId}`, {
          videoId,
          status: completedVideo.status,
          sensitivity: completedVideo.sensitivity
        });
      }
    } catch (error) {
      clearInterval(interval);
      console.error("Video processing failed", error);
    }
  }, 1000); // runs every 1 second
};

module.exports = { processVideo };
