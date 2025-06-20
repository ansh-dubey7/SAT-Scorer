import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Tooltip from './Tooltip';

const AnnouncementForm = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audienceType, setAudienceType] = useState('all');
  const [audienceValue, setAudienceValue] = useState('All Students');
  const [channels, setChannels] = useState({ email: true, push: false, sms: false });
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const exams = ['GRE', 'GMAT', 'IELTS', 'SAT', 'ACT', 'AP'];
  const courses = ['Math', 'Science', 'English'];

  const handleImageChange = (e) => {
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
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById('image-upload').value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }
    onSubmit({
      title,
      content,
      image,
      audience: { type: audienceType, value: audienceValue },
      channels,
      scheduleDate: scheduleDate.toISOString(),
      sendDate: scheduleDate.toISOString(),
    });
    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
    setAudienceType('all');
    setAudienceValue('All Students');
    setChannels({ email: true, push: false, sms: false });
    setScheduleDate(new Date());
    document.getElementById('image-upload').value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Announcement</h2>

      {/* Title */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter announcement title"
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          aria-label="Announcement title"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter announcement content"
          rows={6}
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          aria-label="Announcement content"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Image (Optional)</label>
        <input
          id="image-upload"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 text-gray-700"
          aria-label="Upload announcement image"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="max-w-xs rounded-md border border-gray-200" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              aria-label="Remove image"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Audience Type</label>
          <select
            value={audienceType}
            onChange={(e) => {
              setAudienceType(e.target.value);
              setAudienceValue(
                e.target.value === 'all' ? 'All Students' :
                e.target.value === 'exam' ? exams[0] :
                e.target.value === 'course' ? courses[0] :
                users[0].name
              );
            }}
            className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            aria-label="Audience type"
          >
            <option value="all">All Students</option>
            <option value="exam">By Exam</option>
            <option value="course">By Course</option>
            <option value="user">Specific User</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Audience</label>
          <select
            value={audienceValue}
            onChange={(e) => setAudienceValue(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            aria-label="Audience selection"
            disabled={audienceType === 'all'}
          >
            {audienceType === 'exam' ? (
              exams.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))
            ) : audienceType === 'course' ? (
              courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))
            ) : audienceType === 'user' ? (
              users.map((user) => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))
            ) : (
              <option value="All Students">All Students</option>
            )}
          </select>
        </div>
      </div>

      {/* Channels */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Notification Channels</label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center relative">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={channels.email}
                onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                className="mr-2"
                aria-label="Send via email"
              />
              Email
            </label>
            <Tooltip text="Sends an email to the selected audience, visible in the sent notifications table.">
              <span className="ml-2 text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
            </Tooltip>
          </div>
          <div className="flex items-center relative">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={channels.push}
                onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                className="mr-2"
                aria-label="Send via push notification"
              />
              Push
            </label>
            <Tooltip text="Sends a push notification to the selected audience, visible in the sent notifications table.">
              <span className="ml-2 text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
            </Tooltip>
          </div>
          <div className="flex items-center relative">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={channels.sms}
                onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                className="mr-2"
                aria-label="Send via SMS"
              />
              SMS
            </label>
            <Tooltip text="Sends an SMS to the selected audience, visible in the sent notifications table.">
              <span className="ml-2 text-gray-500 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Schedule Send</label>
        <DatePicker
          selected={scheduleDate}
          onChange={setScheduleDate}
          showTimeSelect
          dateFormat="Pp"
          className="w-full p-3 border border-gray-200 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          aria-label="Schedule send date and time"
        />
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          aria-label="Create announcement"
        >
          Create Announcement
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;