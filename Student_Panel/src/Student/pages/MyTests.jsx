import React, { useState, useEffect } from 'react';
import TestCard from '../components/TestCard';
import useApi from '../Data/api';

const MyTests = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { fetchTests } = useApi();

  const loadTests = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasError(false);
      const data = await fetchTests(activeTab);
      const transformedTests = data.map(item => ({
        id: item.id,
        title: item.title,
        examType: item.examType,
        date: item.date,
        time: item.time,
        status: item.status,
        score: item.score || 'N/A',
      }));
      setTests(transformedTests);
    } catch (err) {
      setError(err.message || 'Failed to load tests');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasError) {
      loadTests();
    }
  }, [activeTab, hasError]);

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Tests</h2>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Completed
        </button>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <div className="text-red-600">
          <p>{error}</p>
          <button
            onClick={loadTests}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.length > 0 ? (
            tests.map((test) => <TestCard key={test.id} test={test} />)
          ) : (
            <p className="text-gray-600">No tests available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTests;