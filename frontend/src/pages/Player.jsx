const Player = ({ videoId }) => {
  const videoUrl = `http://localhost:5000/api/videos/stream/${videoId}`;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <video
        src={videoUrl}
        controls
        className="w-full rounded shadow"
      />
    </div>
  );
};

export default Player;
