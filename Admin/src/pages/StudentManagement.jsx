import React, { useState } from "react";
import RegisteredStudents from "../components/students/RegisteredStudents";
import EnrolledStudents from "../components/students/EnrolledStudents";

const StudentManagement = () => {
  const [activeTab, setActiveTab] = useState('registered');
  const tabs = [
    { id: 'registered', label: 'Registered Students' },
    { id: 'enrollments', label: 'Enrollments' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header and Tabs */}
      <div className="sticky top-20 z-10 bg-white shadow-md border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 p-4">
          Student Management Dashboard
        </h1>
        <div className="flex border-b border-gray-200 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={`Select ${tab.label} tab`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'registered' && <RegisteredStudents />}
        {activeTab === 'enrollments' && <EnrolledStudents />}
      </div>
    </div>
  );
};

export default StudentManagement;

