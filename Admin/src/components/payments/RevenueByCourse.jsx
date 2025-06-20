import React from 'react';

const RevenueByCourse = ({ data }) => {
  // Mock data (used if no data prop is provided, for testing)
  const mockData = [
    { course: 'GRE Prep', revenue: 300000, percentage: 40 },
    { course: 'SAT Math', revenue: 240000, percentage: 32 },
    { course: 'GMAT Verbal', revenue: 210000, percentage: 28 },
  ];

  const revenueData = data || mockData;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue by Course</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Course</th>
            <th className="border border-gray-300 p-3 text-left">Revenue</th>
            <th className="border border-gray-300 p-3 text-left">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{item.course}</td>
              <td className="border border-gray-300 p-3">₹{item.revenue.toLocaleString('en-IN')}</td>
              <td className="border border-gray-300 p-3">{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueByCourse;