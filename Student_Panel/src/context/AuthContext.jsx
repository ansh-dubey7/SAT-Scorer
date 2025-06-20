import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

 export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data.user; // { name, email, profilePhoto, ... }
      } else {
        throw new Error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwt_decode(token);
          if (decoded.exp * 1000 > Date.now()) {
            // Fetch user profile to get the name and other details
            const profile = await fetchUserProfile(token);
            if (profile) {
              setUser({
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
                name: profile.name, // Add name from profile
                profilePhoto: profile.profilePhoto, // Optional: for future use
              });
            } else {
              localStorage.removeItem('token');
              setUser(null);
            }
          } else {
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('JWT decode error:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwt_decode(data.token);
        const profile = await fetchUserProfile(data.token);
        if (profile) {
          setUser({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: profile.name,
            profilePhoto: profile.profilePhoto,
          });
        }
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (formData, photoFile) => {
    try {
      const data = new FormData();
      data.append('name', formData.fullName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('password', formData.password);
      data.append('address', formData.city);
      data.append('dob', formData.dob);
      data.append('exam', formData.course);
      data.append('school', formData.school);
      if (photoFile) data.append('profilePhoto', photoFile);

      console.log('Sending signup data:', Object.fromEntries(data));
      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        const decoded = jwt_decode(result.token);
        const profile = await fetchUserProfile(result.token);
        if (profile) {
          setUser({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: profile.name,
            profilePhoto: profile.profilePhoto,
          });
        }
        return { success: true };
      } else {
        console.error('Signup failed:', result, "aa gya na error");
        return { success: false, error: result.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchProtected = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return fetch(url, { ...options, headers });
  };

  // Add a method to refresh user data after profile updates
  const refreshUserData = async () => {
    const token = localStorage.getItem('token');
    if (token && user) {
      const profile = await fetchUserProfile(token);
      if (profile) {
        setUser((prev) => ({
          ...prev,
          name: profile.name,
          profilePhoto: profile.profilePhoto,
        }));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, fetchProtected, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthContext  ;