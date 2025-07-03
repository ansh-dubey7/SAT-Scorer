// import React from "react";

// const VideoModal = ({ videoId, onClose }) => {
//   if (!videoId) return null;

//   const videoUrl = `https://www.youtube.com/embed/${videoId}`;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
//       <div className="bg-gray-900 rounded-xl w-11/12 md:w-3/4 lg:w-1/2 p-4 relative">
//         <div className="flex justify-between items-center mb-2 text-white">
//           <h2 className="text-lg font-semibold">User Input / Output</h2>
//           <div>
//             <a
//               href={`https://www.youtube.com/watch?v=${videoId}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded mr-2"
//             >
//               Open in New Tab
//             </a>
//             <button
//               onClick={onClose}
//               className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//         <iframe
//           width="100%"
//           height="360"
//           src={videoUrl}
//           title="YouTube video player"
//           frameBorder="0"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default VideoModal;


// Student/components/viewcourse/VideoModal.jsx
import React from 'react';

const VideoModal = ({ videoId, onClose }) => {
  if (!videoId) {
    return null;
  }

  // Function to extract YouTube video ID from URL or ID
  const getYouTubeEmbedUrl = (input) => {
    console.log("Input videoId:", input); // Debug: Log input videoId

    // Regular expression to match YouTube video ID from various URL formats
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = input.match(youtubeRegex);
    const videoId = match ? match[1] : input;

    // Validate video ID (YouTube IDs are 11 characters long)
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      console.error("Invalid YouTube video ID:", videoId);
      return null; // Return null if invalid
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log("Generated embed URL:", embedUrl); // Debug: Log embed URL
    return embedUrl;
  };

  const embedUrl = getYouTubeEmbedUrl(videoId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold transition-colors"
          aria-label="Close video modal"
        >
          ✕
        </button>

        {embedUrl ? (
          <iframe
            className="w-full h-64 sm:h-80 md:h-96 rounded-md"
            src={embedUrl}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 bg-gray-100 rounded-md">
            <p className="text-red-600 text-sm sm:text-base text-center">
              Unable to load video. The video ID is invalid or the video is not embeddable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;