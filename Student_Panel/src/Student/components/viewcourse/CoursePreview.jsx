// Student/components/CoursePreview.jsx
import React from "react";

const CoursePreview = ({ selectedVideoId }) => {
  return (
    <div className="w-1/2 bg-white shadow p-4 rounded h-[calc(100vh-150px)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Content Preview</h2>
      {selectedVideoId ? (
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-500">Click on a video to start learning.</p>
      )}
    </div>
  );
};

export default CoursePreview;
