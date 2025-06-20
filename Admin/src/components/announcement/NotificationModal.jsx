import React from 'react';

const NotificationModal = ({ open, onClose, notification }) => {
  if (!open || !notification) return null;

  const getChannels = (channels) => {
    const selected = [];
    if (channels.email) selected.push('Email');
    if (channels.push) selected.push('Push');
    if (channels.sms) selected.push('SMS');
    return selected.join(', ') || 'None';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 rounded-lg border border-gray-200 max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{notification.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2"
            aria-label="Close notification modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 text-sm text-gray-600">
          <p><strong>Audience:</strong> {notification.audience.type === 'user' ? `User: ${notification.audience.value}` : notification.audience.value}</p>
          <p><strong>Channels:</strong> {getChannels(notification.channels)}</p>
          <p><strong>Send Date:</strong> {new Date(notification.sendDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {notification.status}</p>
          <p><strong>Open Rate:</strong> {notification.openRate}%</p>
          <div>
            <strong>Content:</strong>
            <pre className="mt-2 p-3 bg-white rounded-md border border-gray-200 text-sm text-gray-600 whitespace-pre-wrap">
              {notification.content}
            </pre>
          </div>
          {notification.image && (
            <div>
              <strong>Image:</strong>
              <img src={notification.image} alt="Announcement" className="mt-2 max-w-full rounded-md border border-gray-200" />
            </div>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;