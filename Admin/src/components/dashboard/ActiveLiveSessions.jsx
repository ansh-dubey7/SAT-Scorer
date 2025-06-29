import React from 'react';
import { Link } from 'react-router-dom';

const ActiveLiveSessions = () => {
  // Mock data
  const sessions = [
    {
      id: 1,
      title: 'SAT Math Review',
      instructor: 'John Doe',
      time: '2025-05-25T10:00:00Z',
      status: 'live',
    },
    {
      id: 2,
      title: 'Verbal Prep Session',
      instructor: 'Alice Smith',
      time: '2025-05-25T15:00:00Z',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Essay Writing Workshop',
      instructor: 'Emma Brown',
      time: '2025-05-26T11:00:00Z',
      status: 'upcoming',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Active Live Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-2 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div>
              <Link to={`/live?id=${session.id}`} className="text-blue-500 hover:underline">
                {session.title}
              </Link>
              <p className="text-sm text-gray-600">{session.instructor}</p>
              <p className="text-sm text-gray-600">
                {new Date(session.time).toLocaleString()}
              </p>
            </div>
            <div>
              {session.status === 'live' ? (
                <a
                  href={`/live/join/${session.id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Join
                </a>
              ) : (
                <Link
                  to={`/live?id=${session.id}`}
                  className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  View
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link to="/live/manage" className="text-blue-500 hover:underline mt-4 block">
        View All
      </Link>
    </div>
  );
};

export default ActiveLiveSessions;