import React, { useState, useEffect } from 'react';
import PlatformSettings from '../components/setting/PlatformSettings';
import CoursePricing from '../components/setting/CoursePricing';
import RolesPermissions from '../components/setting/RolesPermissions';

const Settings = () => {
  const [tab, setTab] = useState(0);
  const [platformSettings, setPlatformSettings] = useState({});
  const [discountCodes, setDiscountCodes] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState({});
  const isAdmin = true; // Mock admin; replace with AuthContext

  // Load data from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('platformSettings');
    const storedDiscounts = localStorage.getItem('discountCodes');
    const storedUsers = localStorage.getItem('users');
    const storedPermissions = localStorage.getItem('permissions');

    if (storedSettings) {
      setPlatformSettings(JSON.parse(storedSettings));
    } else {
      const mockSettings = {
        siteName: 'EduPlatform',
        headerLogo: null,
        favicon: null,
        emailTemplates: {
          welcome: 'Welcome to {siteName}! Your account is ready.',
          enrollment: 'You have enrolled in {courseName}. Start learning!',
          passwordReset: 'Click here to reset your password: {resetLink}',
          support: 'Thank you for reaching out. We will respond soon.',
        },
      };
      setPlatformSettings(mockSettings);
      localStorage.setItem('platformSettings', JSON.stringify(mockSettings));
    }

    if (storedDiscounts) {
      setDiscountCodes(JSON.parse(storedDiscounts));
    } else {
      const mockDiscounts = [
        {
          id: 1,
          code: 'SAVE10',
          type: 'percentage',
          value: 10,
          validFrom: '2025-05-01T00:00:00Z',
          validTo: '2025-06-30T23:59:59Z',
          maxUsage: 100,
          active: true,
        },
        {
          id: 2,
          code: 'FLAT50',
          type: 'fixed',
          value: 50,
          validFrom: '2025-05-15T00:00:00Z',
          validTo: '2025-07-15T23:59:59Z',
          maxUsage: 50,
          active: false,
        },
      ];
      setDiscountCodes(mockDiscounts);
      localStorage.setItem('discountCodes', JSON.stringify(mockDiscounts));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor' },
        { id: 3, name: 'Alex Johnson', email: 'alex@example.com', role: 'Support' },
      ];
      setUsers(mockUsers);
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }

    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    } else {
      const mockPermissions = {
        'View Courses': { Admin: true, Instructor: true, Support: true },
        'Manage Tests': { Admin: true, Instructor: true, Support: false },
        'Access Admin Panel': { Admin: true, Instructor: false, Support: false },
        'Manage Users': { Admin: true, Instructor: false, Support: false },
        'View Support Tickets': { Admin: true, Instructor: false, Support: true },
      };
      setPermissions(mockPermissions);
      localStorage.setItem('permissions', JSON.stringify(mockPermissions));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('platformSettings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    localStorage.setItem('discountCodes', JSON.stringify(discountCodes));
  }, [discountCodes]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }, [permissions]);

  return (
    <div className="p-6 pt-4 bg-white/70 backdrop-blur-sm min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex mb-6 bg-white/90 rounded-lg p-2 border border-gray-200">
        {['Platform Settings', 'Course Pricing', 'Roles & Permissions'].map((label, index) => (
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

      {/* Platform Settings */}
      {tab === 0 && (
        <div className="bg-white/90 rounded-lg shadow border border-gray-200 p-6">
          <PlatformSettings settings={platformSettings} setSettings={setPlatformSettings} />
        </div>
      )}

      {/* Course Pricing */}
      {tab === 1 && (
        <div className="bg-white/90 rounded-lg shadow border border-gray-200 p-6">
          <CoursePricing discountCodes={discountCodes} setDiscountCodes={setDiscountCodes} />
        </div>
      )}

      {/* Roles & Permissions */}
      {tab === 2 && (
        <div className="bg-white/90 rounded-lg shadow border border-gray-200 p-6">
          <RolesPermissions
            users={users}
            setUsers={setUsers}
            permissions={permissions}
            setPermissions={setPermissions}
          />
        </div>
      )}
    </div>
  );
};

export default Settings;