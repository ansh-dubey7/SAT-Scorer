import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MetricCard from '../components/dashboard/MetricCard';
import PopularCourses from '../components/dashboard/PopularCourses';
import TopTests from '../components/dashboard/TopTests';
import LiveSessions from '../components/dashboard/LiveSessions'; // Updated import
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalPaidStudents: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // Calculate date range for last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        // Fetch total users
        const usersResponse = await axios.get('http://localhost:5000/api/user/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch all enrollments to count unique paid students
        const enrollmentsResponse = await axios.get('http://localhost:5000/api/enrollment', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Get unique user IDs from enrollments
        const uniquePaidStudents = [...new Set(enrollmentsResponse.data.enrollments.map(enrollment => enrollment.userId.toString()))].length;

        // Fetch revenue for last 30 days
        const paymentsResponse = await axios.get('http://localhost:5000/api/payment', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            allStatuses: false, // Only completed payments
          },
        });

        // Calculate total revenue
        const totalRevenue = paymentsResponse.data.payments.reduce((sum, payment) => {
          return sum + (payment.status === 'completed' ? payment.amount : 0);
        }, 0);

        setMetrics({
          totalUsers: usersResponse.data.count || 0,
          totalPaidStudents: uniquePaidStudents || 0,
          monthlyRevenue: totalRevenue || 0,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard metrics');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMetrics();
    }
  }, [token]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard 
          title="Total Users" 
          value={metrics.totalUsers.toLocaleString()} 
          icon={assets.user_icon} 
          change={metrics.totalUsers > 0 ? '+0%' : '0%'} 
        />
        <MetricCard 
          title="Total Paid Students" 
          value={metrics.totalPaidStudents.toLocaleString()} 
          icon={assets.student_management_icon} 
          change={metrics.totalPaidStudents > 0 ? '+0%' : '0%'} 
        />
        <MetricCard 
          title="Revenue this Month" 
          value={`₹${metrics.monthlyRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
          icon={assets.sales_and_payments_icon} 
          change={metrics.monthlyRevenue > 0 ? '+0%' : '0%'} 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PopularCourses />
        <TopTests />
        <LiveSessions /> {/* Updated component name */}
      </div>
    </div>
  );
};

export default Dashboard;






// import React from 'react';
// import MetricCard from '../components/dashboard/MetricCard';
// import PopularCourses from '../components/dashboard/PopularCourses';
// import TopTests from '../components/dashboard/TopTests';
// import ActiveLiveSessions from '../components/dashboard/ActiveLiveSessions';
// import { assets } from '../assets/assets';

// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <MetricCard title="Total Users" value="1,234" icon={assets.user_icon} change="+5%"/>
//         <MetricCard title="Total Paid Students" value="567" icon={assets.student_management_icon} change="+3%"/>
//         <MetricCard title="Revenue this Month" value="₹12,345" icon={assets.sales_and_payments_icon}change="-2%"/>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <PopularCourses />
//         <TopTests />
//         <ActiveLiveSessions />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;