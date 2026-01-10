import { useEffect, useState } from "react";
import API from "../services/api";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("completed");
  const [sensitivityFilter, setSensitivityFilter] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [statusFilter, sensitivityFilter]);

  const fetchVideos = async () => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sensitivityFilter) params.sensitivity = sensitivityFilter;

    const res = await API.get("/videos", { params });
    setVideos(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Videos</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sensitivityFilter}
          onChange={(e) => setSensitivityFilter(e.target.value)}
        >
          <option value="">All Sensitivity</option>
          <option value="safe">Safe</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="border rounded p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p>Status: <b>{video.status}</b></p>
            <p>
              Sensitivity:{" "}
              <span
                className={
                  video.sensitivity === "safe"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {video.sensitivity}
              </span>
            </p>

            {video.status === "completed" && (
              <button
                onClick={() => setPlayingVideoId(video._id)}
                className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Play
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Video Player (same page) */}
      {playingVideoId && (
        <div className="mt-10">
          <h3 className="font-semibold mb-2">Now Playing</h3>
          <video
            controls
            className="w-full max-w-4xl"
            src={`http://localhost:5000/api/videos/stream/${playingVideoId}`}
          />
        </div>
      )}
    </div>
  );
};

export default MyVideos;
