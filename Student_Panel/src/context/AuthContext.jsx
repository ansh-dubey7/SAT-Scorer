// import React, { createContext, useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';

//  export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/user/profile', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         return data.user; // { name, email, profilePhoto, ... }
//       } else {
//         throw new Error(data.message || 'Failed to fetch user profile');
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decoded = jwt_decode(token);
//           if (decoded.exp * 1000 > Date.now()) {
//             // Fetch user profile to get the name and other details
//             const profile = await fetchUserProfile(token);
//             if (profile) {
//               setUser({
//                 userId: decoded.userId,
//                 email: decoded.email,
//                 role: decoded.role,
//                 name: profile.name, // Add name from profile
//                 profilePhoto: profile.profilePhoto, // Optional: for future use
//               });
//             } else {
//               localStorage.removeItem('token');
//               setUser(null);
//             }
//           } else {
//             localStorage.removeItem('token');
//             setUser(null);
//           }
//         } catch (error) {
//           console.error('JWT decode error:', error);
//           localStorage.removeItem('token');
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('/api/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         const decoded = jwt_decode(data.token);
//         const profile = await fetchUserProfile(data.token);
//         if (profile) {
//           setUser({
//             userId: decoded.userId,
//             email: decoded.email,
//             role: decoded.role,
//             name: profile.name,
//             profilePhoto: profile.profilePhoto,
//           });
//         }
//         return { success: true };
//       } else {
//         return { success: false, error: data.message };
//       }
//     } catch (error) {
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const signup = async (formData, photoFile) => {
//     try {
//       const data = new FormData();
//       data.append('name', formData.fullName);
//       data.append('email', formData.email);
//       data.append('phone', formData.phone);
//       data.append('password', formData.password);
//       data.append('address', formData.city);
//       data.append('dob', formData.dob);
//       data.append('exam', formData.course);
//       data.append('school', formData.school);
//       if (photoFile) data.append('profilePhoto', photoFile);

//       console.log('Sending signup data:', Object.fromEntries(data));
//       const response = await fetch('/api/user/register', {
//         method: 'POST',
//         body: data,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', result.token);
//         const decoded = jwt_decode(result.token);
//         const profile = await fetchUserProfile(result.token);
//         if (profile) {
//           setUser({
//             userId: decoded.userId,
//             email: decoded.email,
//             role: decoded.role,
//             name: profile.name,
//             profilePhoto: profile.profilePhoto,
//           });
//         }
//         return { success: true };
//       } else {
//         console.error('Signup failed:', result, "aa gya na error");
//         return { success: false, error: result.message || 'Registration failed' };
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const fetchProtected = async (url, options = {}) => {
//     const token = localStorage.getItem('token');
//     const headers = {
//       ...options.headers,
//       Authorization: token ? `Bearer ${token}` : '',
//     };
//     return fetch(url, { ...options, headers });
//   };

//   // Add a method to refresh user data after profile updates
//   const refreshUserData = async () => {
//     const token = localStorage.getItem('token');
//     if (token && user) {
//       const profile = await fetchUserProfile(token);
//       if (profile) {
//         setUser((prev) => ({
//           ...prev,
//           name: profile.name,
//           profilePhoto: profile.profilePhoto,
//         }));
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading, fetchProtected, refreshUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default  AuthContext  ;

import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

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
          const decoded = jwtDecode(token);
          console.log('JWT payload:', decoded); // Debug payload
          if (!decoded.userId || !/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
            console.error('Invalid userId in token:', decoded.userId);
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            return;
          }
          if (decoded.exp * 1000 < Date.now()) {
            console.log('Token expired, clearing token');
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            return;
          }
          const profile = await fetchUserProfile(token);
          if (profile) {
            setUser({
              userId: decoded.userId,
              email: decoded.email,
              role: decoded.role,
              name: profile.name,
              profilePhoto: profile.profilePhoto,
            });
          } else {
            console.error('Failed to fetch user profile, clearing token');
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('JWT decode error:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        console.log('No token found in localStorage');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        console.log('Login JWT payload:', decoded);
        if (!decoded.userId || !/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
          throw new Error('Invalid token: No userId');
        }
        const profile = await fetchUserProfile(data.token);
        if (profile) {
          setUser({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: profile.name,
            profilePhoto: profile.profilePhoto,
          });
          return { success: true };
        }
        localStorage.removeItem('token');
        return { success: false, error: 'Failed to fetch user profile' };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
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
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        const decoded = jwtDecode(result.token);
        console.log('Signup JWT payload:', decoded);
        if (!decoded.userId || !/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
          throw new Error('Invalid token: No userId');
        }
        const profile = await fetchUserProfile(result.token);
        if (profile) {
          setUser({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: profile.name,
            profilePhoto: profile.profilePhoto,
          });
          return { success: true };
        }
        localStorage.removeItem('token');
        return { success: false, error: 'Failed to fetch user profile' };
      } else {
        console.error('Signup failed:', result);
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

export default AuthProvider; 


// import React, { createContext, useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const initializeAuth = async () => {
//     const token = localStorage.getItem('token');
//     console.log("Initializing AuthProvider, token:", token ? token.slice(0, 20) + '...' : null); // Debug: Partial token
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("Decoded JWT:", decoded); // Debug: Full payload
//         const currentTime = Date.now() / 1000;
//         if (decoded.exp < currentTime) {
//           console.log("Token expired, exp:", decoded.exp, "current:", currentTime);
//           localStorage.removeItem('token');
//           setUser(null);
//           return;
//         }
//         if (!decoded.userId || !/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
//           console.log("Invalid userId in token:", decoded.userId);
//           localStorage.removeItem('token');
//           setUser(null);
//         } else {
//           setUser({
//             userId: decoded.userId,
//             email: decoded.email || '',
//             role: decoded.role || 'user',
//           });
//         }
//       } catch (err) {
//         console.error("JWT decode error:", err.message);
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     } else {
//       console.log("No token found in localStorage");
//       setUser(null);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   const login = async (token) => {
//     localStorage.setItem('token', token);
//     try {
//       const decoded = jwtDecode(token);
//       console.log("Login JWT:", decoded); // Debug
//       const currentTime = Date.now() / 1000;
//       if (decoded.exp < currentTime) {
//         throw new Error('Token expired');
//       }
//       if (!decoded.userId || !/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
//         throw new Error('Invalid user ID in token');
//       }
//       setUser({
//         userId: decoded.userId,
//         email: decoded.email || '',
//         role: decoded.role || 'user',
//       });
//     } catch (err) {
//       console.error("Login JWT decode error:", err.message);
//       localStorage.removeItem('token');
//       setUser(null);
//       throw err;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const refreshToken = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/user/refresh-token', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: localStorage.getItem('token') }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to refresh token');
//       }
//       localStorage.setItem('token', data.token);
//       await login(data.token);
//       console.log("Token refreshed successfully");
//     } catch (err) {
//       console.error("Token refresh error:", err.message);
//       logout();
//     }
//   };

//   const fetchProtected = async (url, options = {}) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token available');
//     }
//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers: {
//           ...options.headers,
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.status === 401) {
//         console.log("401 Unauthorized, attempting to refresh token");
//         await refreshToken();
//         const newToken = localStorage.getItem('token');
//         return fetch(url, {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//       }
//       return response;
//     } catch (err) {
//       console.error("Fetch protected error:", err.message);
//       throw err;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, fetchProtected, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;