import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';

const CreateAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audienceType, setAudienceType] = useState('all');
  const [audienceValue, setAudienceValue] = useState('all');
  const [type, setType] = useState('announcement');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();
  const { addNotification } = useContext(NotificationContext);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { role: 'student', status: 'active' },
      });
      setStudents(response.data.users.map(user => ({
        id: user._id,
        name: user.name,
        phone: user.phone || 'N/A',
        display: `${user.name}${user.phone ? ` (${user.phone})` : ''}`,
      })));
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/course/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses.map(course => ({ id: course._id, title: course.title })));
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB.');
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        toast.error('Only PNG and JPEG images are allowed.');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById('image-upload').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message || !type || !audienceType) {
      toast.error('Title, message, type, and audience are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    if (image) formData.append('image', image);
    formData.append('type', type);
    formData.append('audienceType', audienceType);
    formData.append('recipient', audienceValue);
    if (scheduleEnabled && scheduledAt) formData.append('scheduledAt', scheduledAt.toISOString());

    try {
      const response = await axios.post('http://localhost:5000/api/notification', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      addNotification(response.data.notification);
      toast.success(response.data.message);
      setTitle('');
      setMessage('');
      setImage(null);
      setImagePreview(null);
      setAudienceType('all');
      setAudienceValue('all');
      setType('announcement');
      setScheduleEnabled(false);
      setScheduledAt(new Date());
      setSearchTerm('');
      document.getElementById('image-upload').value = '';
    } catch (error) {
      console.error('Error creating notification:', error);
      toast.error(error.response?.data?.message || 'Failed to create notification');
    }
  };

  const filteredStudents = students.filter(student =>
    student.display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Notification title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Notification message"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image (Optional)</label>
          <input
            id="image-upload"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
            aria-label="Upload notification image"
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Notification type"
          >
            <option value="announcement">Announcement</option>
            <option value="reminder">Reminder</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Audience Type</label>
            <select
              value={audienceType}
              onChange={(e) => {
                setAudienceType(e.target.value);
                setAudienceValue(
                  e.target.value === 'all' ? 'all' :
                  e.target.value === 'course' && courses.length > 0 ? courses[0].id :
                  e.target.value === 'student' && students.length > 0 ? students[0].id : ''
                );
                setSearchTerm('');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Audience type"
            >
              <option value="all">All Students</option>
              <option value="course">By Course</option>
              <option value="student">Specific Student</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Audience</label>
            {audienceType === 'student' ? (
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student..."
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                  aria-label="Search student"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          onClick={() => {
                            setAudienceValue(student.id);
                            setSearchTerm('');
                          }}
                          className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800"
                        >
                          {student.display}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-600">No students found</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <select
                value={audienceValue}
                onChange={(e) => setAudienceValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Audience selection"
                disabled={audienceType === 'all'}
              >
                {audienceType === 'course' ? (
                  courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))
                ) : (
                  <option value="all">All Students</option>
                )}
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="block text-gray-700 font-medium">Schedule Notification</label>
          <input
            type="checkbox"
            checked={scheduleEnabled}
            onChange={(e) => setScheduleEnabled(e.target.checked)}
            className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            aria-label="Toggle schedule"
          />
        </div>

        {scheduleEnabled && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">Schedule Date & Time</label>
            <DatePicker
              selected={scheduledAt}
              onChange={setScheduledAt}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Schedule send date and time"
            />
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
            aria-label="Create notification"
          >
            Create Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
