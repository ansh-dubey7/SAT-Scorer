import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import TestManagement from './pages/TestManagement';
import StudentManagement from './pages/StudentManagement';
import SalesAndPayments from './pages/SalesAndPayments';
import UpdateContent from './pages/UpdateContent';
import LiveSessions from './pages/LiveSessions';
import FreeTestAccess from './pages/FreeTestAccess';
import Announcements from './pages/Announcement';
import SupportAndFeedback from './pages/SupportAndFeedback';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastify-custom.css'; // Custom CSS for toast styling

const ProtectedRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        style={{ width: '350px', fontFamily: 'Arial, sans-serif' }}
        className="custom-toast-container"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="courses" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
          <Route path="tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
          <Route path="students" element={<ProtectedRoute><StudentManagement /></ProtectedRoute>} />
          <Route path="sales" element={<ProtectedRoute><SalesAndPayments /></ProtectedRoute>} />
          <Route path="content" element={<ProtectedRoute><UpdateContent /></ProtectedRoute>} />
          <Route path="live" element={<ProtectedRoute><LiveSessions /></ProtectedRoute>} />
          <Route path="free-tests" element={<ProtectedRoute><FreeTestAccess /></ProtectedRoute>} />
          <Route path="announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="support" element={<ProtectedRoute><SupportAndFeedback /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
