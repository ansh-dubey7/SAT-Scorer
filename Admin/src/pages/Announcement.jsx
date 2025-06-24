import React, { useState } from 'react';
import CreateAnnouncement from '../components/announcement/CreateAnnouncement';
import ManageAnnouncement from '../components/announcement/ManageAnnouncement';

const Announcement = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-20 z-30 bg-white shadow-md border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 px-6 py-4">Notification Management Dashboard</h1>
        <div className="flex border-b border-gray-200 px-6">
          {['create', 'manage'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'create' ? 'Create Notification' : 'Manage Notifications'}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {activeTab === 'create' && <CreateAnnouncement />}
        {activeTab === 'manage' && <ManageAnnouncement />}
      </div>
    </div>
  );
};

export default Announcement;
