// import React, { useState, useEffect } from 'react';
// import CourseCard from '../components/CourseCard';
// import useApi from '../Data/api';

// const MyCourses = () => {
//   const [activeTab, setActiveTab] = useState('paid');
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasError, setHasError] = useState(false);
//   const { fetchEnrolledCourses } = useApi();

//   const loadCourses = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setHasError(false);
//       const data = await fetchEnrolledCourses();
//       const filteredCourses = data.filter(course => course.type === activeTab);
//       const transformedCourses = filteredCourses.map(course => ({
//         id: course.id,
//         title: course.title,
//         thumbnail: course.thumbnail || 'https://via.placeholder.com/150',
//         examType: course.examType,
//         startDate: course.startDate,
//         endDate: course.endDate,
//         progress: course.progress || 0,
//       }));
//       setCourses(transformedCourses);
//     } catch (err) {
//       setError(err.message || 'Failed to load courses');
//       setHasError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!hasError) {
//       loadCourses();
//     }
//   }, [activeTab, hasError]);

//   return (
//     <div className="p-6 bg-white">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Courses</h2>
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('paid')}
//           className={`px-4 py-2 rounded-md font-medium ${
//             activeTab === 'paid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Paid
//         </button>
//         <button
//           onClick={() => setActiveTab('free')}
//           className={`px-4 py-2 rounded-md font-medium ${
//             activeTab === 'free' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Free
//         </button>
//       </div>
//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : error ? (
//         <div className="text-red-600">
//           <p>{error}</p>
//           <button
//             onClick={loadCourses}
//             className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.length > 0 ? (
//             courses.map((course) => <CourseCard key={course.id} course={course} />)
//           ) : (
//             <p className="text-gray-600">No courses enrolled.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCourses;

import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import useApi from '../Data/api';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('paid');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { fetchEnrolledCourses } = useApi();

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasError(false);
      const data = await fetchEnrolledCourses();
      const filteredCourses = data.filter(course => course.type === activeTab);
      const transformedCourses = filteredCourses.map(course => ({
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnail || 'https://via.placeholder.com/150',
        examType: course.examType,
        startDate: course.startDate,
        endDate: course.endDate,
        progress: course.progress || 0,
      }));
      setCourses(transformedCourses);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasError) {
      loadCourses();
    }
  }, [activeTab, hasError]);

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Courses</h2>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'paid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Paid
        </button>
        <button
          onClick={() => setActiveTab('free')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'free' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Free
        </button>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <div className="text-red-600">
          <p>{error}</p>
          <button
            onClick={loadCourses}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course.id} course={course} />)
          ) : (
            <p className="text-gray-600">No courses enrolled.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;