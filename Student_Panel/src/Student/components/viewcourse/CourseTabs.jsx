import React from 'react';

const CourseTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex gap-4 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 px-4 text-sm font-medium ${
            activeTab === tab
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          {tab === 'overview' ? 'Overview' : tab === 'lectures' ? 'Lectures' : 'Study Materials'}
        </button>
      ))}
    </div>
  );
};

export default CourseTabs;





// import React from "react";

// const CourseTabs = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="flex gap-4 mb-6 border-b border-gray-200">
//       {["lectures", "materials"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`pb-2 px-1 text-sm font-medium transition-colors ${
//             activeTab === tab
//               ? "text-purple-600 border-b-2 border-purple-600"
//               : "text-gray-600 hover:text-purple-600"
//           }`}
//           aria-selected={activeTab === tab}
//         >
//           {tab === "lectures" ? "📚 Lectures" : "📜 Study Materials"}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CourseTabs;





 