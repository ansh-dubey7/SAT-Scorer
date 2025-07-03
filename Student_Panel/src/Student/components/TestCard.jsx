// import React from "react";
// import { Link } from "react-router-dom";

// const TestCard = ({ test }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
//       <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
//       <p className="text-sm text-gray-500 mb-1">Exam: {test.examType}</p>
//       <p className="text-sm text-gray-500 mb-1">Date: {test.date}</p>
//       <p className="text-sm text-gray-500 mb-3">Time: {test.time}</p>

//       {test.status === "Scheduled" ? (
//         <Link
//           to={`/test/start/${test.id}`}
//           className="w-full block bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center"
//         >
//           Start Test
//         </Link>
//       ) : (
//         <>
//           <p className="text-sm text-gray-600 mb-2">Score: {test.score}</p>
//           <Link
//             to={`/test/result/${test.id}`}
//             className="w-full block bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-center"
//           >
//             View Result
//           </Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default TestCard;




// import React from 'react';

// const TestCard = ({ test }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
//       <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
//       <p className="text-sm text-gray-500 mb-1">Exam: {test.examType}</p>
//       <p className="text-sm text-gray-500 mb-1">Date: {test.date}</p>
//       <p className="text-sm text-gray-500 mb-3">Time: {test.time}</p>

//       {test.status === 'Scheduled' ? (
//         <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
//           Start Test
//         </button>
//       ) : (
//         <>
//           <p className="text-sm text-gray-600 mb-2">Score: {test.score}</p>
//           <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
//             View Result
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default TestCard;


// Student/components/TestCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
      <p className="text-sm text-gray-500 mb-1">Exam: {test.examType}</p>
      <p className="text-sm text-gray-500 mb-1">Date: {test.date}</p>
      <p className="text-sm text-gray-500 mb-3">Time: {test.time}</p>
      {test.status === 'Scheduled' ? (
        <Link
          to={`/test/start/${test.id}`}
          className="w-full block bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center"
        >
          Start Test
        </Link>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-2">Score: {test.score}</p>
          <Link
            to={`/test/result/${test.id}`}
            className="w-full block bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-center"
          >
            View Result
          </Link>
        </>
      )}
    </div>
  );
};

export default TestCard;