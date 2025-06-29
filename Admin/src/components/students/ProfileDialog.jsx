import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileDialog = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [reviewTestId, setReviewTestId] = useState(null);
  const apiUrl = 'http://localhost:5000/api';

  const testReviews = {
    GRE1: {
      name: 'GRE Practice Test 1',
      questions: ['What is the derivative of x²?', 'What is the capital of France?'],
      answers: ['2x', 'Paris'],
    },
    GRE2: {
      name: 'GRE Practice Test 2',
      questions: ['Simplify: (x + 2)²', 'Who wrote "Hamlet"?'],
      answers: ['x² + 4x + 4', 'William Shakespeare'],
    },
    IELTS1: {
      name: 'IELTS Mock Test 1',
      questions: ['Describe your hometown.', 'Talk about a recent journey.'],
      answers: ['My hometown is vibrant and diverse...', 'I recently traveled to the mountains...'],
    },
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/${studentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStudent(response.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch student');
      }
    };

    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/enrollment`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { userId: studentId },
        });
        setEnrollments(response.data.enrollments);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch enrollments');
      }
    };

    if (studentId) {
      fetchStudent();
      fetchEnrollments();
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto p-8">
          <p className="text-red-500">Student not found.</p>
          <button
            onClick={() => navigate('/students/registered')}
            className="mt-4 px-4 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            Back to Registered Students
          </button>
        </div>
      </div>
    );
  }

  const address = student.address || `${student.city || 'New York'}, NY, USA`;
  const profilePhoto = student.profilePhoto || 'N/A';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b-2 border-gray-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Profile: {student.name}
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src={profilePhoto}
              alt={`${student.name}'s profile`}
              className="w-32 h-32 rounded-full border-2 border-gray-200 shadow-md object-cover"
            />
            <button
              onClick={() => navigate('/students/registered')}
              className="text-gray-600 hover:bg-gray-100 rounded-full p-2.5 transition-colors"
              aria-label="Close profile dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Full Name:</strong> {student.name}</p>
                  <p><strong>Email Address:</strong> {student.email}</p>
                  <p><strong>Phone Number:</strong> {student.phone || 'Not provided'}</p>
                  <p><strong>Date of Birth:</strong> {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                  <p><strong>Address:</strong> {address}</p>
                  <p><strong>University:</strong> {student.university || 'Not provided'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Details</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p><strong>Enrolled Courses:</strong></p>
                    {enrollments.length > 0 ? (
                      <ul className="list-disc pl-5 mt-1">
                        {enrollments.map((enroll, i) => (
                          <li key={i}>{enroll.courseId?.title || 'Unknown Course'}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">Not enrolled in any course</p>
                    )}
                  </div>
                  <div>
                    <p><strong>Test History:</strong></p>
                    {student.tests?.length > 0 ? (
                      <ul className="space-y-3 mt-1">
                        {student.tests.map((test, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center border border-gray-200 p-3 rounded bg-white shadow-sm"
                          >
                            <div>
                              <p className="font-medium">{testReviews[test.id]?.name || 'Unknown Test'}</p>
                              <p>Score: {test.score || 'N/A'}</p>
                              <p>Date: {test.date ? new Date(test.date).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <button
                              onClick={() => setReviewTestId(test.id)}
                              className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                            >
                              Review
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No tests taken</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reviewTestId && testReviews[reviewTestId] && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full border-2 border-gray-300 p-8 rounded-xl shadow-xl">
            <button
              onClick={() => setReviewTestId(null)}
              className="absolute top-4 right-4 text-gray-600 hover:bg-gray-100 p-2.5 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Test Review: {testReviews[reviewTestId].name}
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              {testReviews[reviewTestId].questions.map((q, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <p><strong>Question {i + 1}:</strong> {q}</p>
                  <p><strong>Answer:</strong> {testReviews[reviewTestId].answers[i]}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setReviewTestId(null)}
                className="px-4 py-1.5 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDialog;
