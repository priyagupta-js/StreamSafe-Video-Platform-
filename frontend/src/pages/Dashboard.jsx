import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import Player from "./Player";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sensitivityFilter, setSensitivityFilter] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const fetchVideos = async () => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sensitivityFilter) params.sensitivity = sensitivityFilter;

    const res = await API.get("/videos", { params });
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, [statusFilter, sensitivityFilter]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Videos</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="uploaded">Uploaded</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setSensitivityFilter(e.target.value)}
        >
          <option value="">All Sensitivity</option>
          <option value="safe">Safe</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            onPlay={setPlayingVideoId}
          />
        ))}
      </div>

      {/* Player */}
      {playingVideoId && <Player videoId={playingVideoId} />}
    </div>
  );
};

export default Dashboard;
