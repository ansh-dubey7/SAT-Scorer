// Student/components/TestList.jsx
import React from "react";

const TestList = ({ modules, onTestStart }) => {
  return (
    <div>
      {modules.map((module, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{module.title}</h2>
          <ul>
            {module.tests?.map((test, tidx) => (
              <li
                key={tidx}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex justify-between items-center"
              >
                🧪 {test.title}
                <button
                  onClick={() => onTestStart(test.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Start Test
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TestList;

