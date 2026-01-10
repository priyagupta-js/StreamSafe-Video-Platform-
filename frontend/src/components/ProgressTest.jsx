import useVideoProgress from "../hooks/useVideoProgress";

const ProgressTest = ({ videoId }) => {
  const { progress, status, sensitivity } = useVideoProgress(videoId);

  return (
    <div className="p-4 border rounded">
      <p>Status: {status}</p>
      <p>Progress: {progress}%</p>
      <p>Sensitivity: {sensitivity}</p>
    </div>
  );
};

export default ProgressTest;
