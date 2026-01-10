import { useEffect, useState } from "react";
import socket from "../services/socket";

const useVideoProgress = (videoId) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("uploaded");
  const [sensitivity, setSensitivity] = useState("pending");

  useEffect(() => {
    if (!videoId) return;

    // Listen for progress updates
    socket.on(`video-progress-${videoId}`, (data) => {
      setProgress(data.progress);
      setStatus(data.status);
    });

    // Listen for completion
    socket.on(`video-completed-${videoId}`, (data) => {
      setStatus(data.status);
      setSensitivity(data.sensitivity);
      setProgress(100);
    });

    return () => {
      socket.off(`video-progress-${videoId}`);
      socket.off(`video-completed-${videoId}`);
    };
  }, [videoId]);

  return { progress, status, sensitivity };
};

export default useVideoProgress;
