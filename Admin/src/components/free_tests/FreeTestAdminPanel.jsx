import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FreeTestAdminPanel = ({ tests, setTests }) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/course', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to fetch courses');
        toast.error('Failed to fetch courses', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleToggleStatus = async (testId, currentIsFree) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/test/${testId}`,
        { isFree: !currentIsFree },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTests(tests.map((t) => (t._id === testId ? response.data.test : t)));
      toast.success(`Test marked as ${currentIsFree ? 'paid' : 'free'} successfully.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      setError('Failed to update test status');
      toast.error('Failed to update test status', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTests = tests.filter(
    (test) =>
      test.status === 'published' &&
      (searchQuery !== '' || selectedCourse !== '') &&
      (selectedCourse === '' || test.courseId.title === selectedCourse) &&
      (searchQuery === '' ||
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.courseId.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Free/Paid Tests</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-sm">{error}</div>
      )}
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div className="relative flex-grow mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search tests by title or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
            disabled={isLoading}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course._id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p className="text-gray-600 text-center">Loading tests...</p>
      ) : (searchQuery === '' && selectedCourse === '') ? (
        <p className="text-gray-600 text-center">Please search or select a course to view tests.</p>
      ) : filteredTests.length === 0 ? (
        <p className="text-gray-600 text-center">No tests match the search or selected course.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="p-4 font-medium">Test</th>
                <th className="p-4 font-medium">Course</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr
                  key={test._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-800">{test.title}</td>
                  <td className="p-4 text-gray-800">{test.courseId.title}</td>
                  <td className="p-4 text-gray-800">{test.duration} min</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.isFree ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {test.isFree ? 'Free' : 'Paid'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(test._id, test.isFree)}
                      className={`text-${
                        test.isFree ? 'red' : 'teal'
                      }-600 hover:text-${
                        test.isFree ? 'red' : 'teal'
                      }-700 font-semibold flex items-center space-x-1 transition-colors`}
                      disabled={isLoading}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{test.isFree ? 'Mark Paid' : 'Mark Free'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FreeTestAdminPanel;
