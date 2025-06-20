


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpenIcon,
  ClipboardDocumentListIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const sidebarItems = [
  { name: 'My Courses', path: '/studentdashboard/mycourses', icon: BookOpenIcon },
  { name: 'My Tests', path: '/studentdashboard/mytests', icon: ClipboardDocumentListIcon },
  { name: 'Classes', path: '/studentdashboard/classes', icon: VideoCameraIcon },
  { name: 'Support', path: '/studentdashboard/support', icon: QuestionMarkCircleIcon },
  { name: 'Settings', path: '/studentdashboard/settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white/90 backdrop-blur-md w-64 h-screen fixed top-10 left-0 z-40 border-r border-gray-300 shadow-sm">
      <div className="flex flex-col h-full space-y-1 p-4 pt-16">
        <nav className="space-y-2">
          {sidebarItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`flex items-center px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-md border ${
                  isActive ? 'text-gray-900 bg-gray-100 border-gray-400' : 'border-transparent'
                }`}
              >
                <Icon className="w-6 h-6 mr-2" />
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;



// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BookOpenIcon, ClipboardDocumentListIcon, VideoCameraIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// const sidebarItems = [
//   { name: 'My Courses', path: '/studentdashboard/mycourses', icon: BookOpenIcon },
//   { name: 'My Tests', path: '/studentdashboard/mytests', icon: ClipboardDocumentListIcon },
//   { name: 'Classes', path: '/studentdashboard/classes', icon: VideoCameraIcon },
//   { name: 'Support', path: '/studentdashboard/support', icon: QuestionMarkCircleIcon },
//   { name: 'Settings', path: '/studentdashboard/settings', icon: Cog6ToothIcon },
// ];

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <aside className="bg-gray-100 w-64 h-screen fixed top-0 left-0 z-40 border-r border-gray-200">
//       <nav className="space-y-1 p-4 pt-16">
//         {sidebarItems.map(({ name, path, icon: Icon }) => {
//           const isActive = location.pathname === path;
//           return (
//             <Link
//               key={name}
//               to={path}
//               className={`flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md ${
//                 isActive ? 'text-blue-600 bg-blue-50' : ''
//               }`}
//             >
//               <Icon className="w-5 h-5 mr-2" />
//               {name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;