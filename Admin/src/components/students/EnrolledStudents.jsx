import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SearchFilter from './SearchFilter';

const EnrolledStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const exams = ['GRE', 'GMAT', 'IELTS', 'SAT', 'ACT', 'AP'];

  const mockEnrollments = [
    {
      _id: '1',
      userId: { name: 'John Doe', email: 'john@example.com' },
      courseId: { title: 'GRE Prep Course', examType: 'GRE' },
      enrolledAt: new Date('2025-01-01'),
      endDate: new Date('2025-06-30'),
      status: 'active',
    },
    {
      _id: '2',
      userId: { name: 'Jane Smith', email: 'jane@example.com' },
      courseId: { title: 'IELTS Intensive', examType: 'IELTS' },
      enrolledAt: new Date('2025-02-01'),
      endDate: new Date('2025-07-31'),
      status: 'active',
    },
    {
      _id: '3',
      userId: { name: 'Bob Johnson', email: 'bob@example.com' },
      courseId: { title: 'SAT Prep Course', examType: 'SAT' },
      enrolledAt: new Date('2025-03-01'),
      endDate: new Date('2025-08-31'),
      status: 'expired',
    },
  ];

  const [enrollments, setEnrollments] = useState(mockEnrollments);

  const toggleEnrollmentStatus = (id) => {
    try {
      setEnrollments((prev) =>
        prev.map((e) =>
          e._id === id
            ? { ...e, status: e.status === 'active' ? 'expired' : 'active' }
            : e
        )
      );
      toast.success(
        `Enrollment status updated to ${
          enrollments.find((e) => e._id === id).status === 'active'
            ? 'expired'
            : 'active'
        }`
      );
    } catch (error) {
      toast.error('Failed to update enrollment status');
    }
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      (!examFilter || enrollment.courseId.examType === examFilter) &&
      (!searchQuery ||
        enrollment.userId.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        enrollment.userId.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Enrollments</h2>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        examFilter={examFilter}
        setExamFilter={setExamFilter}
        exams={exams}
        showExamFilter={true}
      />
      <div className="overflow-x-auto">
        {filteredEnrollments.length === 0 ? (
          <p className="text-gray-600 text-center">No enrollments found.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Course</th>
                <th className="p-4 font-medium">Start Date</th>
                <th className="p-4 font-medium">End Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr
                  key={enrollment._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-800">{enrollment.userId.name}</td>
                  <td className="p-4 text-gray-800">{enrollment.courseId.title}</td>
                  <td className="p-4 text-gray-800">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-800">
                    {new Date(enrollment.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        enrollment.status === 'active'
                          ? 'bg-teal-100 text-teal-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {enrollment.status.charAt(0).toUpperCase() +
                        enrollment.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => toggleEnrollmentStatus(enrollment._id)}
                      className={`${
                        enrollment.status === 'active'
                          ? 'text-red-600 hover:text-red-700'
                          : 'text-teal-600 hover:text-teal-700'
                      } font-semibold flex items-center space-x-1 transition-colors`}
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
                          d={
                            enrollment.status === 'active'
                              ? 'M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728'
                              : 'M5 13l4 4L19 7'
                          }
                        />
                      </svg>
                      <span>
                        {enrollment.status === 'active' ? 'Expire' : 'Activate'}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EnrolledStudents;
