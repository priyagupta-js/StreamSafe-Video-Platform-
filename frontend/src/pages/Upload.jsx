import { useState } from "react";
import API from "../services/api";
import useVideoProgress from "../hooks/useVideoProgress";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { progress, status, sensitivity } = useVideoProgress(videoId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      alert("Title and video file are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", videoFile);

    try {
      setLoading(true);

      const res = await API.post("/videos/upload", formData);

      setVideoId(res.data.video._id);
      setTitle("");
      setVideoFile(null);
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Video Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Progress Section */}
      {videoId && (
        <div className="mt-6">
          <p className="mb-1">Status: {status}</p>

          <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-1">{progress}%</p>

          {status === "completed" && (
            <p className="mt-2 font-semibold">
              Sensitivity:{" "}
              <span
                className={
                  sensitivity === "safe"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {sensitivity}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
