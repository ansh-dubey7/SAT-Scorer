import React, { useState } from 'react';
import CreateTest from '../components/tests/CreateTest';
import ManageTests from '../components/tests/ManageTests';
import TestAnalytics from '../components/tests/TestAnalytics';

const TestManagement = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [activeSubTab, setActiveSubTab] = useState('details'); // State for sub-tabs

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header and Tabs */}
      <div className="sticky top-20 z-30 bg-white shadow-md border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 px-6 py-4">Test Management Dashboard</h1>
        {/* Main Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {['create', 'manage', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'create') setActiveSubTab('details'); // Reset to Test Details when switching to Create Test
              }}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'create' ? 'Create Test' : tab === 'manage' ? 'Manage Tests' : 'Test Analysis'}
            </button>
          ))}
        </div>
        {/* Sub-tabs for Create Test */}
        {activeTab === 'create' && (
          <div className="flex px-6 py-2 bg-white border-b border-gray-200">
            <button
              onClick={() => setActiveSubTab('details')}
              className={`w-1/2 px-4 py-1.5 font-semibold text-sm transition-colors duration-200 rounded-md ${
                activeSubTab === 'details'
                  ? 'border-2 border-teal-600 text-teal-600'
                  : 'text-gray-500 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              Test Details
            </button>
            <button
              onClick={() => setActiveSubTab('questions')}
              className={`w-1/2 px-4 py-1.5 font-semibold text-sm transition-colors duration-200 rounded-md ${
                activeSubTab === 'questions'
                  ? 'border-2 border-teal-600 text-teal-600'
                  : 'text-gray-500 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              Add Questions
            </button>
          </div>
        )}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'create' && <CreateTest activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />}
        {activeTab === 'manage' && <ManageTests />}
        {activeTab === 'analytics' && <TestAnalytics />}
      </div>
    </div>
  );
};

export default TestManagement;
