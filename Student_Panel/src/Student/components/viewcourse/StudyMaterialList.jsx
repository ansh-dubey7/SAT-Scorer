// Student/components/StudyMaterialList.jsx
import React from "react";

const StudyMaterialList = ({ modules }) => {
  return (
    <div>
      {modules.map((module, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{module.title}</h2>
          <ul>
            {module.materials?.map((mat, midx) => (
              <li
                key={midx}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex justify-between items-center"
              >
                📄 {mat.title}
                <a
                  href={mat.fileUrl}
                  download
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StudyMaterialList;
