import React, { useState } from 'react';

const NotificationTable = ({ announcements, onView, onResend, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'sendDate', direction: 'desc' });

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (sortConfig.key === 'title') {
      return sortConfig.direction === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortConfig.key === 'sendDate') {
      return sortConfig.direction === 'asc'
        ? new Date(a.sendDate) - new Date(b.sendDate)
        : new Date(b.sendDate) - new Date(a.sendDate);
    } else if (sortConfig.key === 'status') {
      return sortConfig.direction === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortConfig.key === 'openRate') {
      return sortConfig.direction === 'asc'
        ? a.openRate - b.openRate
        : b.openRate - a.openRate;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const getChannels = (channels) => {
    const selected = [];
    if (channels.email) selected.push('Email');
    if (channels.push) selected.push('Push');
    if (channels.sms) selected.push('SMS');
    return selected.join(', ') || 'None';
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sent Notifications</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-600">No notifications sent.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  Title {getSortIcon('title')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Audience
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => handleSort('sendDate')}
                >
                  Send Date {getSortIcon('sendDate')}
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status {getSortIcon('status')}
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => handleSort('openRate')}
                >
                  Open Rate {getSortIcon('openRate')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Channels
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAnnouncements.map((ann, index) => (
                <tr
                  key={ann.id}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">{ann.title}</td>
                  <td className="px-4 py-2">
                    {ann.audience.type === 'user' ? `User: ${ann.audience.value}` : ann.audience.value}
                  </td>
                  <td className="px-4 py-2">{new Date(ann.sendDate).toLocaleString()}</td>
                  <td className="px-4 py-2">{ann.status}</td>
                  <td className="px-4 py-2">{ann.openRate}%</td>
                  <td className="px-4 py-2">{getChannels(ann.channels)}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => onView(ann)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                      aria-label={`View ${ann.title}`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => onResend(ann.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                      aria-label={`Resend ${ann.title}`}
                    >
                      Resend
                    </button>
                    <button
                      onClick={() => onDelete(ann.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                      aria-label={`Delete ${ann.title}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotificationTable;