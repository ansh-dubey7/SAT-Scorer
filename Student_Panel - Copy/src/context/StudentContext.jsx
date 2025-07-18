import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthContext } from './AuthContext';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetchedCourses, setHasFetchedCourses] = useState(false);
  const { fetchProtected, authError, user } = useAuthContext();

  const fetchCourses = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetchProtected('http://localhost:5000/api/enrollment/myenrollment');
      const data = await response.json();
      console.log('myenrollment', data);
      if (response.ok) {
        const enrolledCourses = data.enrollments.map(enrollment => ({
          ...enrollment.courseId,
          enrollmentStatus: enrollment.status,
        }));
        setCourses(enrolledCourses);
        setError(null);
      } else {
        setError(data.message || 'Failed to load courses');
        setCourses([]);
      }
    } catch (err) {
      setError(authError || err.message || 'Failed to load courses');
      setCourses([]);
    } finally {
      setIsLoading(false);
      setHasFetchedCourses(true);
    }
  }, [user, fetchProtected, authError]);

  useEffect(() => {
    if (user && !hasFetchedCourses) {
      fetchCourses();
    }
  }, [user, hasFetchedCourses, fetchCourses]);

  const fetchCourseById = useCallback(async (courseId) => {
    try {
      const response = await fetchProtected(`http://localhost:5000/api/course/${courseId}`);
      const data = await response.json();
      console.log('course', data);
      if (response.ok) {
        setError(null);
        return data.course;
      } else {
        setError(data.message || 'Failed to fetch course');
        return null;
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch course');
      return null;
    }
  }, [fetchProtected]);

  const fetchVideosForCourse = useCallback(async (courseId) => {
    try {
      const response = await fetchProtected(`http://localhost:5000/api/video/course/${courseId}`);
      const data = await response.json();
      if (response.ok) {
        setError(null);
        return data.videos || [];
      } else {
        setError(data.message || 'Failed to fetch videos');
        return [];
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch videos');
      return [];
    }
  }, [fetchProtected]);

  const fetchNotesForCourse = useCallback(async (courseId) => {
    try {
      const response = await fetchProtected(`http://localhost:5000/api/notes/course/${courseId}`);
      const data = await response.json();
      if (response.ok) {
        setError(null);
        return data.notes || [];
      } else {
        setError(data.message || 'Failed to fetch notes');
        return [];
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch notes');
      return [];
    }
  }, [fetchProtected]);

  const fetchLiveSessionsForCourse = useCallback(async (courseId) => {
    try {
      const response = await fetchProtected(`http://localhost:5000/api/livesession/course/${courseId}`);
      const data = await response.json();
      if (response.ok) {
        setError(null);
        return data.sessions || [];
      } else {
        setError(data.message || 'Failed to fetch live sessions');
        return [];
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch live sessions');
      return [];
    }
  }, [fetchProtected]);

  return (
    <StudentContext.Provider
      value={{ courses, isLoading, error, fetchCourses, fetchCourseById, fetchVideosForCourse, fetchNotesForCourse, fetchLiveSessionsForCourse }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
