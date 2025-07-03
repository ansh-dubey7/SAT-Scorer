import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import useApi from '../../Student/Data/api';

const TestResult = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const { fetchTestById } = useApi();

  const loadTest = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasError(false);
      const data = await fetchTestById(id);
      const transformedTest = {
        id: data._id,
        title: data.title,
        score: data.results?.[0]?.score || 0,
        answers: data.results?.[0]?.answers.reduce((acc, ans) => ({
          ...acc,
          [ans.questionId]: ans.selectedAnswer,
        }), {}) || {},
        questions: data.questions.map(q => ({
          id: q._id,
          question: q.text,
          options: q.options.map(opt => opt.text),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'No explanation provided',
        })),
      };
      setTest(transformedTest);
    } catch (err) {
      setError(err.message || 'Test not found');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasError) {
      loadTest();
    }
  }, [id, hasError]);

  const toggleExplanation = (questionId) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return (
    <div className="p-6 text-red-600">
      <p>{error}</p>
      <button
        onClick={loadTest}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
  if (!test) return <div className="p-6 text-gray-600">Test not found.</div>;

  return (
    <div className="p-6">
      <BackButton to="/studentdashboard/mytests" label="Back to My Tests" />
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{test.title} - Results</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <p className="text-lg font-semibold mb-4">Score: {test.score}</p>
        {test.questions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Question {index + 1}: {q.question}
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
                <p><strong>Correct Answer:</strong> {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}</p>
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

 