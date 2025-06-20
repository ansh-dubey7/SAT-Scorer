import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Filters from '../components/payments/Filters';
import KpiCard from '../components/payments/KpiCard';
import RevenueByCourse from '../components/payments/RevenueByCourse';
import WebhookStatus from '../components/payments/WebhookStatus';
import PurchaseHistoryTable from '../components/payments/PurchaseHistoryTable';

const SalesAndPayments = () => {
  // Mock data (last 30 days, INR)
  const mockData = {
    transactions: [
      { id: 'TXN123456', customer: 'user@example.com', course: 'GRE Prep', date: '2025-05-27', amount: '₹7,499', paymentMethod: 'Stripe', status: 'Completed', countryWithCity: 'India, Mumbai' },
      { id: 'TXN123457', customer: 'john.doe@example.com', course: 'SAT Math', date: '2025-05-26', amount: '₹5,999', paymentMethod: 'PayPal', status: 'Pending', countryWithCity: 'USA, New York' },
      { id: 'TXN123458', customer: 'jane.smith@example.com', course: 'GMAT Verbal', date: '2025-05-25', amount: '₹9,000', paymentMethod: 'UPI', status: 'Completed', countryWithCity: 'India, Delhi' },
    ],
    revenueData: [
      { course: 'GRE Prep', revenue: 300000, percentage: 40 },
      { course: 'SAT Math', revenue: 240000, percentage: 32 },
      { course: 'GMAT Verbal', revenue: 210000, percentage: 28 },
    ],
    kpis: {
      totalRevenue: 750000, // INR, last 30 days
      totalSales: 250, // Courses sold in last 30 days
      avgOrderValue: 3000, // INR
      newCustomers: 150,
      revenueGrowth: 15, // %
    },
    courses: ['All Courses', 'GRE Prep', 'SAT Math', 'GMAT Verbal'],
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [startDate, setStartDate] = useState(new Date('2025-04-27')); // Last 30 days
  const [endDate, setEndDate] = useState(new Date('2025-05-27'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');

  // Filter transactions based on search, course, and date
  const filteredTransactions = mockData.transactions.filter((txn) => {
    const matchesSearch = txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'All Courses' || txn.course === selectedCourse;
    const txnDate = new Date(txn.date);
    return matchesSearch && matchesCourse && txnDate >= startDate && txnDate <= endDate;
  });

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales and Payments Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <NavLink
          to="#dashboard"
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Revenue Dashboard
        </NavLink>
        <NavLink
          to="#history"
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('history')}
        >
          Purchase History
        </NavLink>
      </div>

      {/* Revenue Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          {/* KPI Cards (Last 30 days) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <KpiCard title="Total Revenue" value={`₹${mockData.kpis.totalRevenue.toLocaleString('en-IN')}`} />
            <KpiCard title="Total Sales" value={mockData.kpis.totalSales} />
            <KpiCard title="Average Order Value" value={`₹${mockData.kpis.avgOrderValue.toLocaleString('en-IN')}`} />
            <KpiCard title="New Students" value={mockData.kpis.newCustomers} />
            <KpiCard title="Revenue Growth" value={`${mockData.kpis.revenueGrowth}%`} />
          </div>

          {/* Revenue by Course */}
          <RevenueByCourse data={mockData.revenueData} />

          {/* Webhook Status */}
          <WebhookStatus />
        </div>
      )}

      {/* Purchase History Tab */}
      {activeTab === 'history' && (
        <div>
          {/* Filters */}
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            courses={mockData.courses}
          />
          {/* Purchase History Table */}
          <PurchaseHistoryTable transactions={filteredTransactions} />
        </div>
      )}
    </div>
  );
};

export default SalesAndPayments;