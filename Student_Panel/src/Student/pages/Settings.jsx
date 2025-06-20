import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '9876543210',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('New passwords do not match.');
    } else {
      alert('Password changed successfully!');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-8 bg-white shadow p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleProfileChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleProfileChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Change */}
      <div className="mb-8 bg-white shadow p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={password.current}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={password.new}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={password.confirm}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white shadow p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationToggle('email')}
              className="w-4 h-4"
            />
            Receive Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationToggle('sms')}
              className="w-4 h-4"
            />
            Receive SMS Notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
