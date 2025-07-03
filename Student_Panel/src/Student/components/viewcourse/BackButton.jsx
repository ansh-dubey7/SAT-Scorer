import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const BackButton = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-5 py-2.5 mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 ease-in-out hover:scale-100 shadow-sm font-semibold text-base"
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;


// Student/components/viewcourse/BackButton.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const BackButton = ({ to, label }) => {
//   return (
//     <Link
//       to={to}
//       className="inline-block mb-4 text-blue-600 hover:underline flex items-center"
//     >
//       ← {label}
//     </Link>
//   );
// };

// export default BackButton;