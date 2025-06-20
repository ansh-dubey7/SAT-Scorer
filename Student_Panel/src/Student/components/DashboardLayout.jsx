

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false); // Close sidebar on route change (mobile only)
  }, [location]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-100 z-40 lg:block ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <Sidebar />
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="flex-1 lg:ml-64 pt-16 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;