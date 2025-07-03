// Student/components/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border">
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{course.examType}</p>
        <p className="text-xs text-gray-500 mb-2">
          {course.startDate} - {course.endDate}
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <Link
           to={`/course/${course.id}`}
          className="block bg-purple-600 text-white text-center py-2 rounded mt-2 hover:bg-purple-700"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;



 