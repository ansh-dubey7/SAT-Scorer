// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import ExamSidebar from './components/ExamSidebar';

// const ExamsLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen font-sans">
//       <Header />
//       <div className="flex flex-1">
//         <ExamSidebar />
//         <main className="flex-1 p-6 bg-gray-50 lg:ml-64 pt-16 pb-16">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ExamsLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import ExamSidebar from './components/ExamSidebar';

const ExamsLayout = () => {
  const handleMenuClick = () => {
    console.log('Sidebar toggle clicked');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex flex-1">
        <ExamSidebar />
        <main className="flex-1 p-6 bg-gradient-to-b from-gray-50 to-gray-100 lg:ml-64 pt-16">
          <Outlet />
        </main>
      </div>
      {/* <footer className="bg-indigo-900 text-white text-center py-4">
        <p>&copy; 2025 SAT Scorer. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default ExamsLayout;