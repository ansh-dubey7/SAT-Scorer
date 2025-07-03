import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const TopTests = () => {
  const { token } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/test', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort tests by number of attempts (results array length)
        const sortedTests = response.data.tests
          .map(test => ({
            id: test._id,
            name: test.title,
            attempts: test.results?.length || 0,
            avgScore: test.results?.length > 0 
              ? (test.results.reduce((sum, result) => sum + (result.score || 0), 0) / test.results.length).toFixed(1)
              : 0,
          }))
          .sort((a, b) => b.attempts - a.attempts)
          .slice(0, 5); // Get top 5 tests

        setTests(sortedTests);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tests');
        console.error('Error fetching tests:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTopTests();
    }
  }, [token]);

  if (loading) {
    return <div className="p-4">Loading tests...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Tests</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="pb-2">Test Name</th>
            <th className="pb-2">Attempts</th>
            <th className="pb-2">Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-2">
                <Link to={`/tests/manage`} className="text-blue-500 hover:underline">
                  {test.name}
                </Link>
              </td>
              <td className="py-2">{test.attempts}</td>
              <td className="py-2">{test.avgScore}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/tests/manage" className="text-blue-500 hover:underline mt-4 block">
        View All
      </Link>
    </div>
  );
};

export default TopTests;




// import React from 'react';
// import { Link } from 'react-router-dom';

// const TopTests = () => {
//   // Mock data
//   const tests = [
//     { id: 1, name: 'Practice Test 1', attempts: 600, avgScore: 85 },
//     { id: 2, name: 'Mock SAT', attempts: 400, avgScore: 78 },
//     { id: 3, name: 'Math Diagnostic', attempts: 350, avgScore: 82 },
//     { id: 4, name: 'Verbal Test', attempts: 300, avgScore: 76 },
//     { id: 5, name: 'Full-Length SAT', attempts: 250, avgScore: 80 },
//   ];

//   return (
//     <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-gray-300">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Tests</h2>
//       <table className="w-full">
//         <thead>
//           <tr className="text-left text-gray-600">
//             <th className="pb-2">Test Name</th>
//             <th className="pb-2">Attempts</th>
//             <th className="pb-2">Avg Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tests.map((test) => (
//             <tr key={test.id} className="border-t border-gray-200 hover:bg-gray-50">
//               <td className="py-2">
//                 <Link to={`/tests?id=${test.id}`} className="text-blue-500 hover:underline">
//                   {test.name}
//                 </Link>
//               </td>
//               <td className="py-2">{test.attempts}</td>
//               <td className="py-2">{test.avgScore}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Link to="/tests/manage" className="text-blue-500 hover:underline mt-4 block">
//         View All
//       </Link>
//     </div>
//   );
// };

// export default TopTests;