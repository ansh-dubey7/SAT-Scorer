import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyProfile = () => {
  const { user, fetchProtected, loading: authLoading, refreshUserData } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePhoto: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    exam: '',
    university: '',
    role: '',
    status: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    exam: '',
    university: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const fetchUserProfile = async () => {
    if (!userId) {
      throw new Error('User not authenticated');
    }
    try {
      const response = await fetchProtected('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user profile');
      }
      return data.user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching profile for user:', user);
      const profileResponse = await fetchProtected('http://localhost:5000/api/user/profile', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const profileData = await profileResponse.json();
      console.log('Profile response:', profileData);

      if (!profileResponse.ok) {
        throw new Error(profileData.message || 'Failed to fetch profile');
      }

      const userProfile = profileData.user;
      setProfile(userProfile);
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        dateOfBirth: userProfile.dateOfBirth ? userProfile.dateOfBirth.split('T')[0] : '',
        exam: userProfile.exam || '',
        university: userProfile.university || '',
      });
    } catch (err) {
      console.error('Error loading profile:', err.message);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      fetchProfile();
    } else {
      setError('Please log in to view your profile.');
      setLoading(false);
    }
  }, [user, authLoading, fetchProtected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setFormError('Please upload a JPEG or PNG image.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image size must be less than 2MB.');
        return;
      }
      setProfilePic(URL.createObjectURL(file));
      setProfilePicFile(file);
      setFormError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Name is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      setFormError('Please enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setError(null);
      setSuccessMessage('');

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('exam', formData.exam);
      formDataToSend.append('university', formData.university);
      if (profilePicFile) {
        formDataToSend.append('profilePhoto', profilePicFile);
      }

      console.log('Updating profile with data:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetchProtected('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Update profile response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setProfile(data.user);
      setIsEditing(false);
      setProfilePic(null);
      setProfilePicFile(null);
      setFormError('');

      await fetchProfile();
      await refreshUserData();

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError(err.message || 'Failed to update profile');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">My Profile</h1>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center text-sm font-medium animate-in fade-in">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium animate-in fade-in">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={profilePic || profile.profilePhoto || `https://ui-avatars.com/api/?name=${profile.name}&background=purple-200&color=indigo-900`}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-3 cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-md">
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileChange} />
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </label>
              )}
            </div>
            {formError && <p className="mt-2 text-sm text-red-500 text-center">{formError}</p>}
          </div>

          {/* Profile Details Section */}
          <div className="space-y-6">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
                  <select
                    name="exam"
                    value={formData.exam}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select Exam</option>
                    {['GRE', 'SAT', 'GMAT', 'IELTS', 'ACT', 'AP'].map((exam) => (
                      <option key={exam} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    placeholder="University"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg font-medium text-gray-800">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-lg font-medium text-gray-800">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-lg font-medium text-gray-800">{profile.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg font-medium text-gray-800">{profile.address || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-lg font-medium text-gray-800">
                      {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exam</p>
                    <p className="text-lg font-medium text-gray-800">{profile.exam || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">University</p>
                    <p className="text-lg font-medium text-gray-800">{profile.university || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-lg font-medium text-gray-800 capitalize">{profile.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-lg font-medium text-gray-800 capitalize">{profile.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-lg font-medium text-gray-800">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profile.name,
                        email: profile.email,
                        phone: profile.phone || '',
                        address: profile.address || '',
                        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
                        exam: profile.exam || '',
                        university: profile.university || '',
                      });
                      setProfilePic(null);
                      setProfilePicFile(null);
                      setFormError('');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;