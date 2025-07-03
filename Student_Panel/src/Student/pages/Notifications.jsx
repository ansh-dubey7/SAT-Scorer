// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import BackButton from '../components/viewcourse/BackButton';
// // import { fetchNotifications } from '../Data/api';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadNotifications = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchNotifications();
//         setNotifications(data);
//       } catch (err) {
//         setError('Failed to load notifications');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadNotifications();
//   }, []);

//   if (loading) return <div className="p-6 text-gray-600 animate-in fade-in">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500 animate-in fade-in">{error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans animate-in fade-in">
//       {/* <BackButton to="/studentdashboard/mycourses" label="Back to My Courses" /> */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
//       <div className="space-y-4">
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all duration-200 ease-in-out"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
//                   <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                   <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
//                 </div>
//                 {notification.action && (
//                   <Link
//                     to={notification.action.link}
//                     className="inline-flex px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105"
//                   >
//                     {notification.action.label}
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-base">No notifications available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;