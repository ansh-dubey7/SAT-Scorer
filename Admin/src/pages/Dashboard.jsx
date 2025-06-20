import React from 'react';
import MetricCard from '../components/dashboard/MetricCard';
import PopularCourses from '../components/dashboard/PopularCourses';
import TopTests from '../components/dashboard/TopTests';
import ActiveLiveSessions from '../components/dashboard/ActiveLiveSessions';
import { assets } from '../assets/assets';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Total Users" value="1,234" icon={assets.user_icon} change="+5%"/>
        <MetricCard title="Total Paid Students" value="567" icon={assets.student_management_icon} change="+3%"/>
        <MetricCard title="Revenue this Month" value="₹12,345" icon={assets.sales_and_payments_icon}change="-2%"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PopularCourses />
        <TopTests />
        <ActiveLiveSessions />
      </div>
    </div>
  );
};

export default Dashboard;