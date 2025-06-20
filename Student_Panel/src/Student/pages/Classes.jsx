// import React, { useState, useEffect } from 'react';
// import ClassCard from '../components/ClassCard';
// import { fetchClasses } from '../../Data/api';

// const Classes = () => {
//   const [activeTab, setActiveTab] = useState('live');
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadClasses = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchClasses(activeTab);
//         setClasses(data);
//       } catch (err) {
//         setError('Failed to load classes');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadClasses();
//   }, [activeTab]);

//   return (
//     <div className="p-6 bg-white">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Classes</h2>
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('live')}
//           className={`px-4 py-2 rounded-md font-medium ${
//             activeTab === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Live Classes
//         </button>
//         <button
//           onClick={() => setActiveTab('upcoming')}
//           className={`px-4 py-2 rounded-md font-medium ${
//             activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Upcoming Classes
//         </button>
//       </div>
//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.length > 0 ? (
//             classes.map((cls) => <ClassCard key={cls.id} cls={cls} />)
//           ) : (
//             <p className="text-gray-600">No classes available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Classes;


import React, { useState } from "react";
import ClassCard from "../components/ClassCard";
import BackButton from "../components/viewcourse/BackButton";

const liveClasses = [
  {
    id: 1,
    title: "Live IELTS Speaking Practice",
    subject: "IELTS - Speaking",
    date: "2025-05-26",
    time: "10:00 AM",
    platform: "Zoom",
    status: "Live",
    link: "https://zoom.us/live-ielts-speaking",
  },
];

const upcomingClasses = [
  {
    id: 2,
    title: "SAT Math Intensive",
    subject: "SAT - Mathematics",
    date: "2025-05-28",
    time: "4:00 PM",
    platform: "Google Meet",
    status: "Upcoming",
    link: "https://meet.google.com/upcoming-sat-math",
  },
  {
    id: 3,
    title: "GRE Verbal Strategies",
    subject: "GRE - Verbal",
    date: "2025-06-01",
    time: "6:00 PM",
    platform: "Zoom",
    status: "Upcoming",
    link: "https://zoom.us/gre-verbal-class",
  },
];

const Classes = () => {
  const [activeTab, setActiveTab] = useState("live");
  const classesToShow = activeTab === "live" ? liveClasses : upcomingClasses;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <BackButton to="/studentdashboard" label="Back to Dashboard" />
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">My Classes</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("live")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "live" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Live Classes
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Upcoming Classes
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesToShow.length > 0 ? (
          classesToShow.map((cls) => <ClassCard key={cls.id} cls={cls} />)
        ) : (
          <p className="text-gray-600">No classes available.</p>
        )}
      </div>
    </div>
  );
};

export default Classes;