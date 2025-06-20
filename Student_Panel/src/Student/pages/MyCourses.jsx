// import React, { useState, useEffect } from 'react';
// import CourseCard from '../components/CourseCard';
// import { fetchCourses } from '../../Data/api';

// const MyCourses = () => {
//   const [activeTab, setActiveTab] = useState('paid');
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchCourses(activeTab);
//         setCourses(data);
//       } catch (err) {
//         setError('Failed to load courses');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCourses();
//   }, [activeTab]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Courses</h2>
//       <div className="flex gap-4 mb-6">
//         {['paid', 'free'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-md font-medium ${
//               activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
//             }`}
//           >
//             {tab === 'paid' ? 'Paid' : 'Free'}
//           </button>
//         ))}
//       </div>
//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCourses;

 import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import AuthContext from '../../context/AuthContext';

const MyCourses = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('paid');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to resolve
    if (!user) {
      console.log('No user found, redirecting to login');
      navigate('/login');
      return;
    }

    const loadCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log('Token:', token ? 'Present' : 'Missing'); // Debug token presence
        if (!token) {
          throw new Error('Authentication token missing');
        }

        const response = await fetch('http://localhost:5000/api/enrollment/myenrollment', {
          method: 'GET', // Explicitly set method
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Ensure correct format
          },
        });

        console.log('Response status:', response.status); // Debug status
        const data = await response.json();
        console.log('Response data:', data); // Debug response

        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized, clearing token and redirecting to login');
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Session expired, please log in again');
          }
          throw new Error(data.message || `Failed to fetch enrollments (Status: ${response.status})`);
        }

        // Map and filter courses based on activeTab
        const filteredCourses = data.enrollments
          .filter((enrollment) => {
            const isPaid = enrollment.course.price > 0;
            const matchesTab = activeTab === 'paid' ? isPaid : !isPaid;
            console.log(`Course: ${enrollment.course.title}, Price: ${enrollment.course.price}, Matches tab: ${matchesTab}`); // Debug filtering
            return matchesTab;
          })
          .map((enrollment) => ({
            id: enrollment.course._id,
            thumbnail: enrollment.course.thumbnail || 'https://via.placeholder.com/600x400',
            title: enrollment.course.title,
            examType: enrollment.course.examType,
            startDate: enrollment.course.startDate
              ? new Date(enrollment.course.startDate).toLocaleDateString()
              : 'TBD',
            endDate: enrollment.course.endDate
              ? new Date(enrollment.course.endDate).toLocaleDateString()
              : 'TBD',
            progress: 0, // Mocked progress
          }));

        console.log('Filtered courses:', filteredCourses); // Debug final courses
        setCourses(filteredCourses);
      } catch (err) {
        console.error('Error loading courses:', err.message); // Debug error
        setError('Failed to load courses: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [activeTab, user, authLoading, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Courses</h2>
      <div className="flex gap-4 mb-6">
        {['paid', 'free'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab === 'paid' ? 'Paid' : 'Free'}
          </button>
        ))}
      </div>
      {loading || authLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No {activeTab} courses found.</p>
      )}
    </div>
  );
};

export default MyCourses;