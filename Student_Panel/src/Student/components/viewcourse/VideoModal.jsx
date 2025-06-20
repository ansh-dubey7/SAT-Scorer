import React from "react";

const VideoModal = ({ videoId, onClose }) => {
  if (!videoId) return null;

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 rounded-xl w-11/12 md:w-3/4 lg:w-1/2 p-4 relative">
        <div className="flex justify-between items-center mb-2 text-white">
          <h2 className="text-lg font-semibold">User Input / Output</h2>
          <div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded mr-2"
            >
              Open in New Tab
            </a>
            <button
              onClick={onClose}
              className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          width="100%"
          height="360"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
