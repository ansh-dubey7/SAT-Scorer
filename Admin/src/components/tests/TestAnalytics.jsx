import React, { useContext } from 'react';
import { TestContext } from '../../context/TestContext';

const TestAnalytics = () => {
  const { tests, analytics, loading, error } = useContext(TestContext);

  const testsWithAnalytics = tests.filter((test) => analytics[test._id]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Analytics</h2>
      {loading && <div className="text-gray-600 mb-4 text-sm text-center">Loading...</div>}
      {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
      {testsWithAnalytics.length === 0 ? (
        <p className="text-gray-600 text-sm text-center">No analytics data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="p-3 text-left font-medium">Test Title</th>
                <th className="p-3 text-left font-medium">Total Students</th>
                <th className="p-3 text-left font-medium">Avg Score</th>
                <th className="p-3 text-left font-medium">Accuracy</th>
                <th className="p-3 text-left font-medium">Difficulty</th>
                <th className="p-3 text-left font-medium">Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {testsWithAnalytics.map((test, index) => (
                <tr
                  key={test._id}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="p-3 text-gray-700">{test.title}</td>
                  <td className="p-3 text-gray-600">{analytics[test._id].totalStudents || 'N/A'}</td>
                  <td className="p-3 text-gray-600">{analytics[test._id].avgScore || 'N/A'}</td>
                  <td className="p-3 text-gray-600">{analytics[test._id].accuracy || 'N/A'}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analytics[test._id].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : analytics[test._id].difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {analytics[test._id].difficulty || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{analytics[test._id].percentage || 'N/A'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestAnalytics;