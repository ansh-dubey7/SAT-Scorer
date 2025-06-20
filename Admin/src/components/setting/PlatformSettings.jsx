import React, { useState } from 'react';
import Tooltip from '../announcement/Tooltip';

const PlatformSettings = ({ settings, setSettings }) => {
  const [siteName, setSiteName] = useState(settings.siteName || '');
  const [headerImagePreview, setHeaderImagePreview] = useState(settings.headerLogo || null);
  const [faviconPreview, setFaviconPreview] = useState(settings.favicon || null);
  const [emailTemplates, setEmailTemplates] = useState(settings.emailTemplates || {});

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB.');
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Only PNG and JPEG images are allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'header') {
          setHeaderImagePreview(reader.result);
          setSettings({ ...settings, headerLogo: reader.result });
        } else {
          setFaviconPreview(reader.result);
          setSettings({ ...settings, favicon: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type) => {
    if (type === 'header') {
      setHeaderImagePreview(null);
      setSettings({ ...settings, headerLogo: null });
      document.getElementById('header-image-upload').value = '';
    } else {
      setFaviconPreview(null);
      setSettings({ ...settings, favicon: null });
      document.getElementById('favicon-image-upload').value = '';
    }
  };

  const handleSave = () => {
    setSettings({
      ...settings,
      siteName,
      emailTemplates: {
        welcome: emailTemplates.welcome || '',
        enrollment: emailTemplates.enrollment || '',
        passwordReset: emailTemplates.passwordReset || '',
        support: emailTemplates.support || '',
      },
    });
    alert('Platform settings saved successfully.');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h2>

      {/* Site Name */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <label className="block text-gray-700 font-semibold">Site Name</label>
          <Tooltip text="This name appears in the site header and browser tab.">
            <span className="text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer">
              i
            </span>
          </Tooltip>
        </div>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Enter site name"
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          aria-label="Site name"
        />
      </div>

      {/* Logo Upload */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <label className="block text-gray-700 font-semibold">Header/Footer Logo</label>
          <Tooltip text="Upload a PNG/JPEG logo for the site header and footer (max 5MB).">
            <span className="text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer">
              i
            </span>
          </Tooltip>
        </div>
        <input
          id="header-image-upload"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleImageChange(e, 'header')}
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 text-gray-700"
          aria-label="Upload header logo"
        />
        {headerImagePreview && (
          <div className="mt-4">
            <img src={headerImagePreview} alt="Header Logo Preview" className="max-w-xs rounded-md border border-gray-200" />
            <button
              type="button"
              onClick={() => handleRemoveImage('header')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              aria-label="Remove header logo"
            >
              Remove Logo
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <label className="block text-gray-700 font-semibold">Favicon</label>
          <Tooltip text="Upload a PNG/JPEG favicon for the browser tab (max 5MB).">
            <span className="text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer">
              i
            </span>
          </Tooltip>
        </div>
        <input
          id="favicon-image-upload"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleImageChange(e, 'favicon')}
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 text-gray-700"
          aria-label="Upload favicon"
        />
        {faviconPreview && (
          <div className="mt-4">
            <img src={faviconPreview} alt="Favicon Preview" className="w-16 h-16 rounded-md border border-gray-200" />
            <button
              type="button"
              onClick={() => handleRemoveImage('favicon')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              aria-label="Remove favicon"
            >
              Remove Favicon
            </button>
          </div>
        )}
      </div>

      {/* Email Templates */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email Templates</label>
        <div className="space-y-4">
          {['welcome', 'enrollment', 'passwordReset', 'support'].map((type) => (
            <div key={type}>
              <div className="flex items-center space-x-2 mb-1">
                <label className="block text-gray-600 text-sm capitalize">{type} Email</label>
                <Tooltip text={`Define the ${type} email template. Use placeholders like {siteName}, {user}, etc.`}>
                  <span className="text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer">
                    i
                  </span>
                </Tooltip>
              </div>
              <textarea
                value={emailTemplates[type] || ''}
                onChange={(e) =>
                  setEmailTemplates({ ...emailTemplates, [type]: e.target.value })
                }
                rows={4}
                placeholder={`Enter ${type} email template`}
                className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                aria-label={`${type} email template`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          aria-label="Save platform settings"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default PlatformSettings;