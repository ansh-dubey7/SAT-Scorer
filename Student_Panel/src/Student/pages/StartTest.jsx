import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import { fetchTestById, submitTest } from '../../Data/api';

const StartTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const data = await fetchTestById(id);
        setTest(data);
        if (data) {
          const durationInSeconds = parseInt(data.duration) * 60;
          setTimeLeft(durationInSeconds);
        }
      } catch (err) {
        setError('Test not found');
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      await submitTest(id, answers);
      setShowConfirmation(true);
    } catch (err) {
      setError('Failed to submit test');
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!test) return <div className="p-6 text-gray-600">Test not found.</div>;

  return (
    <div className="p-6">
      {/* <BackButton to="/studentdashboard/mytests" label="Back to My Tests" /> */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{test.title}</h1>
      <div className="text-lg font-semibold text-red-600 mb-4">
        Time Left: {formatTime(timeLeft)}
      </div>
      <div className="mb-4">
        <p className="text-gray-600"><strong>Duration:</strong> {test.duration}</p>
        <p className="text-gray-600"><strong>Marking Scheme:</strong> {test.markingScheme}</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {test.questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Question {q.id}: {q.question}
            </h2>
            {q.options.map((option, idx) => (
              <label key={idx} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleAnswerChange(q.id, option)}
                  className="mr-2"
                />
                {String.fromCharCode(65 + idx)}. {option}
              </label>
            ))}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Test
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your test has been submitted.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/studentdashboard/mytests')}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Back to My Tests
              </button>
              <button
                onClick={() => navigate(`/test/result/${id}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                View Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTest;