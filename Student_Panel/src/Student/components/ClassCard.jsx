import React from "react";

const ClassCard = ({ cls }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{cls.title}</h3>
      <p className="text-sm text-gray-500 mb-1">Subject: {cls.subject}</p>
      <p className="text-sm text-gray-500 mb-1">Date: {cls.date}</p>
      <p className="text-sm text-gray-500 mb-1">Time: {cls.time}</p>
      <p className="text-sm text-gray-500 mb-3">Platform: {cls.platform}</p>
      <a
        href={cls.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full block text-white py-2 rounded-lg text-center transition-colors ${
          cls.status === "Live" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {cls.status === "Live" ? "Join Now" : "View Details"}
      </a>
    </div>
  );
};

export default ClassCard;