import React from 'react';

const WebhookStatus = ({ statuses }) => {
  // Mock data (used if no statuses prop is provided, for testing)
  const mockStatuses = [
    { gateway: 'Stripe', status: 'Active', lastReceived: '2025-05-27 10:30 AM' },
    { gateway: 'PayPal', status: 'Error', lastReceived: '2025-05-26 09:15 AM' },
  ];

  const webhookStatuses = statuses || mockStatuses;

  const handleTestWebhook = (gateway) => {
    alert(`Test webhook sent for ${gateway}`);
    // Replace with API call: axios.post(`/api/test-webhook/${gateway}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Gateway Status</h3>
      <div className="flex flex-wrap gap-4">
        {webhookStatuses.map((status, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded text-white ${status.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {status.gateway}: {status.status} <span className="text-sm">({status.lastReceived})</span>
          </div>
        ))}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleTestWebhook('Stripe')}
        >
          Test Webhook
        </button>
      </div>
    </div>
  );
};

export default WebhookStatus;