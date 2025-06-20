import React from 'react';
import { Link } from 'react-router-dom';

const PopularCourses = () => {
  // Mock data
  const courses = [
    { id: 1, name: 'SAT', enrollments: 450, capacity: 500 },
    { id: 2, name: 'Math Boost', enrollments: 320, capacity: 400 },
    { id: 3, name: 'Verbal Skills', enrollments: 200, capacity: 300 },
    { id: 4, name: 'Science Review', enrollments: 150, capacity: 250 },
    { id: 5, name: 'Essay Writing', enrollments: 100, capacity: 200 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Courses</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="pb-2">Course Name</th>
            <th className="pb-2">Enrollments</th>
            <th className="pb-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-2">
                <Link to={`/courses?id=${course.id}`} className="text-blue-500 hover:underline">
                  {course.name}
                </Link>
              </td>
              <td className="py-2">{course.enrollments}</td>
              <td className="py-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(course.enrollments / course.capacity) * 100}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/courses" className="text-blue-500 hover:underline mt-4 block">
        View All
      </Link>
    </div>
  );
};

export default PopularCourses;