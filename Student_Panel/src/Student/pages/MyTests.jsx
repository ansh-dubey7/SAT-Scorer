import React, { useState, useEffect } from 'react';
import TestCard from '../components/TestCard';
import { fetchTests } from '../../Data/api';

const MyTests = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = await fetchTests(activeTab);
        setTests(data);
      } catch (err) {
        setError('Failed to load tests');
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [activeTab]);

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
        <p className="text-red-600">{error}</p>
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







// import React, { useState } from "react";
// import TestCard from "../components/TestCard.jsx";
// import BackButton from "../components/viewcourse/BackButton";

// // Mock data (unchanged)
// const scheduledTests = [
//   {
//     id: 1,
//     title: "SAT Mock Test 1",
//     examType: "SAT",
//     date: "2025-06-10",
//     time: "10:00 AM",
//     status: "Scheduled",
//   },
//   {
//     id: 2,
//     title: "GRE Diagnostic Test",
//     examType: "GRE",
//     date: "2025-06-15",
//     time: "2:00 PM",
//     status: "Scheduled",
//   },
// ];

// const completedTests = [
//   {
//     id: 3,
//     title: "IELTS Practice Test 1",
//     examType: "IELTS",
//     date: "2025-05-25",
//     time: "11:00 AM",
//     status: "Completed",
//     score: "Band 7.5",
//   },
//   {
//     id: 4,
//     title: "SAT Mock Test 0",
//     examType: "SAT",
//     date: "2025-05-20",
//     time: "9:00 AM",
//     status: "Completed",
//     score: "1350/1600",
//   },
// ];

// const MyTests = () => {
//   const [activeTab, setActiveTab] = useState("scheduled");

//   const testsToDisplay = activeTab === "scheduled" ? scheduledTests : completedTests;

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Back Button */}
//       <BackButton to="/studentdashboard" label="Back to Dashboard" />

//       {/* Title */}
//       <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">My Tests</h2>

//       {/* Tab Buttons */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("scheduled")}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             activeTab === "scheduled" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Scheduled
//         </button>
//         <button
//           onClick={() => setActiveTab("completed")}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             activeTab === "completed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Completed
//         </button>
//       </div>

//       {/* Test Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {testsToDisplay.length > 0 ? (
//           testsToDisplay.map((test) => <TestCard key={test.id} test={test} />)
//         ) : (
//           <p className="text-gray-600">No tests available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyTests;

 