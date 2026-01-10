import { useEffect, useState } from "react";
import API from "../services/api";

const Player = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/stream/${videoId}`, {
          responseType: "blob"
        });

        const blob = new Blob([res.data], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);

        setVideoUrl(url);
      } catch (error) {
        console.error("Video stream failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoId]);

  if (loading) return <p>Loading video...</p>;

  if (!videoUrl) return <p>Unable to load video</p>;

  return (
    <video
      controls
      autoPlay
      className="w-full max-w-4xl mt-6"
      src={videoUrl}
    />
  );
};

export default Player;
