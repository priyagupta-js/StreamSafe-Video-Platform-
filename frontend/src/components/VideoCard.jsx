const VideoCard = ({ video, onPlay }) => {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-semibold text-lg">{video.title}</h3>

      <p className="text-sm mt-1">
        Status: <span className="font-medium">{video.status}</span>
      </p>

      <p className="text-sm">
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
          onClick={() => onPlay(video._id)}
          className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Play
        </button>
      )}
    </div>
  );
};

export default VideoCard;
