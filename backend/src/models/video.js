const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    filename: {
      type: String,
      required: true
    },

    filepath: {
      type: String,
      required: true
    },

    mimetype: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded"
    },

    sensitivity: {
      type: String,
      enum: ["safe", "flagged", "pending"],
      default: "pending"
    },

    progress: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Video", videoSchema);
