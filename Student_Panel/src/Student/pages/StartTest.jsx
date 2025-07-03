import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import useApi from '../../Student/Data/api';
import { AuthContext } from '../../context/AuthContext';

const StartTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTestById, submitTest } = useApi();
  const { user } = useContext(AuthContext);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("AuthContext user:", user); // Debug: Log user object
    console.log("JWT token:", localStorage.getItem('token')); // Debug: Log token
    if (!user?.userId || !/^[0-9a-fA-F]{24}$/.test(user.userId)) {
      setError("You must be logged in to take the test. Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setAuthLoading(false);
    }
  }, [user, navigate]);

  const loadTest = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTestById(id);
      const transformedTest = {
        id: data._id,
        title: data.title || "Untitled Test",
        duration: data.duration || 60, // Default to 60 minutes if undefined
        markingScheme: data.markingScheme || "1 point per question",
        questions: data.questions.map(q => ({
          id: q._id,
          question: q.text || "No question text",
          options: q.options ? q.options.map(opt => opt.text || "No option") : [],
          type: q.type || "mcq",
          correctAnswer: q.correctAnswer,
        })),
      };
      setTest(transformedTest);
      setTimeLeft(transformedTest.duration * 60); // Initialize timer in seconds
    } catch (err) {
      setError(err.message || "Failed to load test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadTest();
    }
  }, [authLoading]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer, type) => {
    setAnswers(prev => {
      if (type === 'checkbox') {
        const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] : [];
        const updatedAnswers = answer.checked
          ? [...currentAnswers, answer.value]
          : currentAnswers.filter(ans => ans !== answer.value);
        return { ...prev, [questionId]: updatedAnswers.join(',') }; // Join for backend
      }
      return { ...prev, [questionId]: answer };
    });
  };

  const handleSubmit = async () => {
    if (!user?.userId || !/^[0-9a-fA-F]{24}$/.test(user.userId)) {
      setError("Authentication error: Invalid or missing user ID. Please log in again.");
      navigate('/login');
      return;
    }
    setSubmitting(true);
    try {
      console.log("Submitting with userId:", user.userId, "Answers:", answers); // Debug
      await submitTest(id, answers);
      setShowConfirmation(true);
    } catch (err) {
      const errorMessage = err.message.includes("Invalid user ID")
        ? "Authentication error: Invalid user ID. Please log in again."
        : err.message || "Failed to submit test. Please try again.";
      setError(errorMessage);
      if (errorMessage.includes("Authentication error")) navigate('/login');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading test...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={loadTest}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={error.includes("Redirecting to login")}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Test not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/studentdashboard/mytests" label="Back to My Tests" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">{test.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-semibold text-red-600">
            Time Left: {formatTime(timeLeft)}
          </p>
          <div className="text-sm sm:text-base text-gray-600">
            <p><strong>Duration:</strong> {test.duration} minutes</p>
            <p><strong>Marking Scheme:</strong> {test.markingScheme}</p>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {test.questions.map((q, index) => (
            <div key={q.id} className="mb-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Question {index + 1}: {q.question}
              </h2>
              {q.type === 'mcq' ? (
                q.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center mb-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleAnswerChange(q.id, option, q.type)}
                      className="mr-3 h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {String.fromCharCode(65 + idx)}. {option}
                    </span>
                  </label>
                ))
              ) : q.type === 'checkbox' ? (
                q.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center mb-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id]?.split(',').includes(option) || false}
                      onChange={e => handleAnswerChange(q.id, { value: option, checked: e.target.checked }, q.type)}
                      className="mr-3 h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {String.fromCharCode(65 + idx)}. {option}
                    </span>
                  </label>
                ))
              ) : (
                <textarea
                  className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={answers[q.id] || ''}
                  onChange={e => handleAnswerChange(q.id, e.target.value, q.type)}
                  placeholder="Enter your answer"
                  rows="4"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={submitting || !user?.userId}
            className={`w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors ${
              submitting || !user?.userId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Test Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Your test has been submitted.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/studentdashboard/mytests')}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back to My Tests
                </button>
                <button
                  onClick={() => navigate(`/test/result/${id}`)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Result
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartTest;