import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import { fetchTestById } from '../../Data/api';

const TestResult = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedExplanations, setExpandedExplanations] = useState({});

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const data = await fetchTestById(id);
        setTest(data);
      } catch (err) {
        setError('Test not found');
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, [id]);

  const toggleExplanation = (questionId) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!test) return <div className="p-6 text-gray-600">Test not found.</div>;

  return (
    <div className="p-6">
      <BackButton to="/studentdashboard/mytests" label="Back to My Tests" />
        
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{test.title} - Results</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <p className="text-lg font-semibold mb-4">Score: {test.score}</p>
        {test.questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Question {q.id}: {q.question}
            </h2>
            {q.options.map((option, idx) => (
              <div
                key={idx}
                className={`flex items-center mb-2 ${
                  option === test.answers?.[q.id]
                    ? option === q.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                    : ''
                }`}
              >
                <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
                <span>{option}</span>
                {option === q.correctAnswer && (
                  <span className="ml-2 text-green-600 font-semibold">(Correct)</span>
                )}
              </div>
            ))}
            <button
              onClick={() => toggleExplanation(q.id)}
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              {expandedExplanations[q.id] ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            {expandedExplanations[q.id] && (
              <div className="mt-2 text-gray-600">
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <p>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResult;