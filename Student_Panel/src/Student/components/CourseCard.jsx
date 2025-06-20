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





// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CourseCard = ({ course }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
//       <img
//         src={course.thumbnail}
//         alt={course.title}
//         className="w-full h-40 object-cover rounded-xl mb-4"
//       />
//       <h3 className="text-xl font-semibold">{course.title}</h3>
//       <p className="text-sm text-gray-600 mt-1">📘 Exam: {course.examType}</p>
//       <p className="text-sm text-gray-600">📅 Duration: {course.startDate} → {course.endDate}</p>

//       <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 mb-2">
//         <div
//           className="bg-purple-600 h-2.5 rounded-full"
//           style={{ width: `${course.progress}%` }}
//         ></div>
//       </div>
//       <p className="text-sm text-gray-700 mb-3">Progress: {course.progress}%</p>

//       <button
//         onClick={() => navigate(`/course/${course.id}`)}
//         className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-700"
//       >
//         View Course
//       </button>
//     </div>
//   );
// };

// export default CourseCard;








// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const CourseCard = ({ course }) => {
// //   const navigate = useNavigate();

// //   const handleViewCourse = () => {
// //     navigate(`/course/${course.id}`);
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
// //       <img
// //         src={course.thumbnail}
// //         alt={course.title}
// //         className="w-full h-40 object-cover rounded-xl mb-4"
// //       />
// //       <h3 className="text-xl font-semibold">{course.title}</h3>
// //       <p className="text-sm text-gray-600 mt-1">Exam: {course.examType}</p>
// //       <p className="text-sm text-gray-600">Duration: {course.startDate} → {course.endDate}</p>

// //       <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 mb-2">
// //         <div
// //           className="bg-purple-600 h-2.5 rounded-full"
// //           style={{ width: `${course.progress}%` }}
// //         ></div>
// //       </div>
// //       <p className="text-sm text-gray-700 mb-3">Progress: {course.progress}%</p>

// //       <button
// //         onClick={handleViewCourse}
// //         className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-700"
// //       >
// //         View Course
// //       </button>
// //     </div>
// //   );
// // };

// // export default CourseCard;
