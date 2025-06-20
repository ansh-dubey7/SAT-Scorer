import React from "react";
import { PlayIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const CourseContentList = ({ modules, activeTab, onVideoSelect }) => {
  return (
    <div>
      {modules.map((module, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            {module.title}
          </h2>
          <ul>
            {activeTab === "lectures" &&
              module.videos.map((video, vidx) => (
                <li
                  key={vidx}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex items-center"
                  onClick={() => onVideoSelect(video.id)}
                >
                  <PlayIcon className="w-5 h-5 mr-2 text-purple-600" />
                  {video.title} ({video.duration})
                </li>
              ))}

            {activeTab === "materials" &&
              module.materials?.map((mat, midx) => (
                <li
                  key={midx}
                  className="bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-500" />
                    Notes Lecture {midx + 1}: {mat.title}
                  </div>
                  <a
                    href={mat.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline text-sm"
                  >
                    Open
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CourseContentList;


// // Student/components/CourseContentList.jsx
// import React from "react";

// const CourseContentList = ({ modules, activeTab, onVideoSelect }) => {
//   return modules.map((module, idx) => (
//     <div key={idx} className="mb-6">
//       <h2 className="text-lg font-semibold mb-2">{module.title}</h2>
//       <ul>
//         {activeTab === "lectures" &&
//           module.videos.map((video, vidx) => (
//             <li
//               key={vidx}
//               className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2"
//               onClick={() => onVideoSelect(video.id)}
//             >
//               ▶️ {video.title} ({video.duration})
//             </li>
//           ))}

//         {activeTab === "materials" &&
//           module.materials?.map((mat, midx) => (
//             <li
//               key={midx}
//               className="bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex justify-between"
//             >
//               📄 {mat.title}
//               <a
//                 href={mat.fileUrl}
//                 download
//                 className="text-blue-500 underline"
//               >
//                 Download
//               </a>
//             </li>
//           ))}

//         {activeTab === "tests" &&
//           module.tests?.map((test, tidx) => (
//             <li
//               key={tidx}
//               className="bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex justify-between items-center"
//             >
//               🧪 {test.title}
//               <button className="ml-4 bg-blue-500 text-white px-3 py-1 rounded text-sm">
//                 Start Test
//               </button>
//             </li>
//           ))}
//       </ul>
//     </div>
//   ));
// };

// export default CourseContentList;
