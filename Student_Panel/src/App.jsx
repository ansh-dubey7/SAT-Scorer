import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import DashboardLayout from './Student/components/DashboardLayout';
import DashboardHome from './Student/pages/DashboardHome';
import MyCourses from './Student/pages/MyCourses';
import MyTests from './Student/pages/MyTests';
import Classes from './Student/pages/Classes';
import Support from './Student/pages/Support';
import Settings from './Student/pages/Settings';
import ViewCourse from './Student/pages/ViewCourse';
import StartTest from './Student/pages/StartTest';
import TestResult from './Student/pages/TestResult';
// import Notifications from './Student/pages/Notifications';
import MyProfile from './Student/pages/MyProfile';
import ExamsLayout from './ExamsLayout';
import ExamPage from './pages/ExamPage';
import CourseDetails from './pages/CourseDetails';
import FreeTest from './pages/FreeTest';
import FreeTestResult from './pages/FreeTestResult';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route path="/free-test/:examType" element={<FreeTest />} />
          <Route path="/free-test-result/:examType" element={<FreeTestResult />} />

          <Route path="/studentdashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="mycourses" element={<MyCourses />} />
            <Route path="mytests" element={<MyTests />} />
            <Route path="classes" element={<Classes />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
            {/* <Route path="notifications" element={<Notifications />} /> */}
            <Route path="myprofile" element={<MyProfile />} />
          </Route>
          <Route path="/course/:id" element={<ViewCourse />} />
          <Route path="/test/start/:id" element={<StartTest />} />
          <Route path="/test/result/:id" element={<TestResult />} />
          <Route path="/myprofile" element={<Navigate to="/studentdashboard/myprofile" replace />} />
          <Route path="/exams" element={<ExamsLayout />}>
            <Route path=":examType" element={<ExamPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;