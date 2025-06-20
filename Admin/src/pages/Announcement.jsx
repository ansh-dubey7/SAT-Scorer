import React, { useState, useEffect } from 'react';
import AnnouncementForm from '../components/announcement/AnnouncementForm';
import NotificationTable from '../components/announcement/NotificationTable';
import NotificationModal from '../components/announcement/NotificationModal';

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alex Johnson' },
];

const Announcements = () => {
  const [tab, setTab] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const isAdmin = true; // Mock admin; replace with AuthContext

  // Load announcements from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('announcements');
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    } else {
      // Mock initial data
      const mockAnnouncements = [
        {
          id: 1,
          title: 'Welcome to the New Semester',
          content: 'We are excited to kick off the new semester!\nJoin us for orientation on June 1st.',
          image: null,
          audience: { type: 'all', value: 'All Students' },
          channels: { email: true, push: true, sms: false },
          sendDate: '2025-05-27T10:00:00Z',
          status: 'Sent',
          openRate: 85,
        },
        {
          id: 2,
          title: 'GRE Prep Session',
          content: 'Join our GRE prep session on June 1st.\nRegister by May 30th.',
          image: null,
          audience: { type: 'exam', value: 'GRE' },
          channels: { email: true, push: false, sms: true },
          sendDate: '2025-05-26T14:00:00Z',
          status: 'Sent',
          openRate: 70,
        },
        {
          id: 3,
          title: 'Personal Reminder',
          content: 'Please submit your assignment by tomorrow.',
          image: null,
          audience: { type: 'user', value: 'John Doe' },
          channels: { email: true, push: false, sms: false },
          sendDate: '2025-05-25T09:00:00Z',
          status: 'Sent',
          openRate: 90,
        },
      ];
      setAnnouncements(mockAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(mockAnnouncements));
    }
  }, []);

  // Save to localStorage on announcements change
  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleCreateAnnouncement = (announcement) => {
    const newAnnouncement = {
      id: announcements.length + 1,
      ...announcement,
      status: announcement.scheduleDate > new Date().toISOString() ? 'Scheduled' : 'Sent',
      openRate: 0, // Mock initial open rate
    };
    setAnnouncements([...announcements, newAnnouncement]);
    alert('Announcement created successfully.');
  };

  const handleResend = (id) => {
    setAnnouncements(
      announcements.map((ann) =>
        ann.id === id
          ? { ...ann, status: 'Sent', sendDate: new Date().toISOString(), openRate: 0 }
          : ann
      )
    );
    alert('Announcement resent successfully.');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter((ann) => ann.id !== id));
      alert('Announcement deleted successfully.');
    }
  };

  return (
    <div className="p-6 pt-4 bg-white/70 backdrop-blur-sm min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Announcements</h1>

      {/* Tabs */}
      <div className="flex mb-6 bg-white/90 rounded-lg p-2 border border-gray-200">
        {['Create Announcement', 'Sent Notifications'].map((label, index) => (
          <button
            key={index}
            className={`px-6 py-2 font-semibold transition-colors duration-200 ${
              tab === index
                ? 'bg-blue-600 text-white rounded-md'
                : 'text-gray-600 hover:bg-gray-100 rounded-md'
            } mx-1 text-base`}
            onClick={() => setTab(index)}
            aria-label={`Select ${label} tab`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Create Announcement */}
      {tab === 0 && (
        <div className="bg-white/90 rounded-lg shadow border border-gray-200 p-6">
          <AnnouncementForm onSubmit={handleCreateAnnouncement} users={mockUsers} />
        </div>
      )}

      {/* Sent Notifications */}
      {tab === 1 && (
        <div className="bg-white/90 rounded-lg shadow border border-gray-200 p-6">
          <NotificationTable
            announcements={announcements}
            onView={setSelectedNotification}
            onResend={handleResend}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        open={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        notification={selectedNotification}
      />
    </div>
  );
};

export default Announcements;