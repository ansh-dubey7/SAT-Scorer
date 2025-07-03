
// import React, { useState, useEffect, useRef } from "react";
// import ClassCard from "../components/ClassCard";
// import BackButton from "../components/viewcourse/BackButton";
// import useApi from "../../Student/Data/api"; // Adjust path based on your project structure


// const Classes = () => {
//   const { fetchClasses } = useApi();
//   const [activeTab, setActiveTab] = useState("live");
//   const [liveClasses, setLiveClasses] = useState([]);
//   const [upcomingClasses, setUpcomingClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const isMountedRef = useRef(false); // Track if component is mounted

//   useEffect(() => {
//     console.log("useEffect triggered with fetchClasses:", fetchClasses); // Debug: Log when useEffect runs
//     if (isMountedRef.current) return; // Prevent running on updates, only on mount

//     const loadClasses = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching classes..."); // Debug: Log API call
//         const classes = await fetchClasses();
//         console.log("Fetched classes:", classes); // Debug: Log raw API response

//         // Transform API response to ensure compatibility with ClassCard
//         const transformedClasses = classes.map((session) => ({
//           id: session._id || session.id,
//           title: session.title,
//           subject: session.subject || "Unknown Subject",
//           date: session.date || (session.scheduledAt ? new Date(session.scheduledAt).toLocaleDateString() : "N/A"),
//           time: session.time || (session.scheduledAt ? new Date(session.scheduledAt).toLocaleTimeString() : "N/A"),
//           platform: session.platform,
//           link: session.link,
//           status: session.status,
//         }));

//         // Filter classes into live and upcoming
//         const live = transformedClasses.filter((cls) => cls.status === "Live");
//         const upcoming = transformedClasses.filter((cls) => cls.status === "Scheduled");

//         console.log("Live classes:", live); // Debug: Log filtered live classes
//         console.log("Upcoming classes:", upcoming); // Debug: Log filtered upcoming classes

//         setLiveClasses(live);
//         setUpcomingClasses(upcoming);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load classes. Please check your network or try again later.");
//         console.error("Error fetching classes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadClasses();
//     isMountedRef.current = true; // Mark as mounted after first run

//     return () => {
//       isMountedRef.current = false; // Reset on unmount
//     };
//   }, [fetchClasses]);

//   const classesToShow = activeTab === "live" ? liveClasses : upcomingClasses;

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <BackButton to="/studentdashboard" label="Back to Dashboard" />
//       <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">My Classes</h2>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("live")}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             activeTab === "live" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Live Classes
//         </button>
//         <button
//           onClick={() => setActiveTab("upcoming")}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Upcoming Classes
//         </button>
//       </div>

//       {/* Loading and Error States */}
//       {loading && <p className="text-gray-600">Loading classes...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {/* Cards */}
//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classesToShow.length > 0 ? (
//             classesToShow.map((cls) => (
//               <ClassCard key={cls.id} cls={cls} />
//             ))
//           ) : (
//             <p className="text-gray-600">No {activeTab === "live" ? "live" : "upcoming"} classes available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Classes;

import React, { useState, useEffect } from "react";
import ClassCard from "../components/ClassCard";
import BackButton from "../components/viewcourse/BackButton";
import useApi from "../../Student/Data/api"; // Adjust path based on your project structure

const Classes = () => {
  const { fetchClasses } = useApi();
  const [activeTab, setActiveTab] = useState("live");
  const [liveClasses, setLiveClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const classes = await fetchClasses();
        console.log("Fetched classes:", classes); // Debug: Log raw API response

        // Transform API response to match ClassCard props
        const transformedClasses = classes.map((session) => ({
          id: session._id || session.id,
          title: session.title || "Untitled Session",
          subject: session.subject || "Unknown Subject",
          date: session.date || (session.scheduledAt ? new Date(session.scheduledAt).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }) : "N/A"),
          time: session.time || (session.scheduledAt ? new Date(session.scheduledAt).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }) : "N/A"),
          platform: session.platform || "Unknown Platform",
          link: session.link || "#",
          status: session.status || (new Date(session.scheduledAt) <= new Date() ? "Live" : "Scheduled"),
        }));

        // Filter classes into live and upcoming
        const live = transformedClasses.filter((cls) => cls.status === "Live");
        const upcoming = transformedClasses.filter((cls) => cls.status === "Scheduled");

        console.log("Live classes:", live); // Debug: Log filtered live classes
        console.log("Upcoming classes:", upcoming); // Debug: Log filtered upcoming classes

        setLiveClasses(live);
        setUpcomingClasses(upcoming);
        setError(null);
      } catch (err) {
        setError("Unable to load classes. Please check your connection and try again.");
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []); // Empty dependency array to run only on mount

  const classesToShow = activeTab === "live" ? liveClasses : upcomingClasses;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* <BackButton to="/studentdashboard" label="Back to Dashboard" /> */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">My Classes</h2>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("live")}
            className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              activeTab === "live"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            Live Classes
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            Upcoming Classes
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <p className="text-gray-600 text-center text-sm sm:text-base">Loading classes...</p>
        )}
        {error && (
          <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
        )}

        {/* Classes Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {classesToShow.length > 0 ? (
              classesToShow.map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600 text-sm sm:text-base">
                  No {activeTab === "live" ? "live" : "upcoming"} classes available at this time.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;