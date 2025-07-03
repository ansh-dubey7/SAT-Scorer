


// import { AuthContext } from '../../context/AuthContext';
// import { useContext, useMemo } from 'react';

// const useApi = () => {
//   const { fetchProtected, user } = useContext(AuthContext);
//   const userId = user?.userId;

//   // Fetch user profile
//   const fetchUserProfile = async () => {
//     if (!userId) {
//       throw new Error('User not authenticated');
//     }
//     try {
//       const response = await fetchProtected('http://localhost:5000/api/user/profile', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch user profile');
//       }
//       return data.user;
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   };

//   // Fetch course by ID
//   const fetchCourseById = async (courseId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/course/${courseId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch course');
//       }
//       return data.course;
//     } catch (error) {
//       console.error(`Error fetching course ${courseId}:`, error);
//       throw error;
//     }
//   };

//   // Fetch tests for a course
//   const fetchTestsByCourseId = async (courseId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/test/course/${courseId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch tests');
//       }
//       return data.tests;
//     } catch (error) {
//       console.error(`Error fetching tests for course ${courseId}:`, error);
//       throw error;
//     }
//   };

//   // Fetch videos for a course
//   const fetchVideosByCourseId = async (courseId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/video/course/${courseId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch videos');
//       }
//       return data.videos;
//     } catch (error) {
//       console.error(`Error fetching videos for course ${courseId}:`, error);
//       throw error;
//     }
//   };

//   // Fetch notes for a course
//   const fetchNotesByCourseId = async (courseId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/notes/course/${courseId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch notes');
//       }
//       return data.notes;
//     } catch (error) {
//       console.error(`Error fetching notes for course ${courseId}:`, error);
//       throw error;
//     }
//   };

//   // Fetch live sessions for a course
//   const fetchLiveSessionsByCourseId = async (courseId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/livesession/course/${courseId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch live sessions');
//       }
//       return data.sessions;
//     } catch (error) {
//       console.error(`Error fetching live sessions for course ${courseId}:`, error);
//       throw error;
//     }
//   };

//   // Fetch test by ID
//   const fetchTestById = async (testId) => {
//     try {
//       const response = await fetchProtected(`http://localhost:5000/api/test/${testId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch test');
//       }
//       return data.test;
//     } catch (error) {
//       console.error(`Error fetching test ${testId}:`, error);
//       throw error;
//     }
//   };

//   // Submit test answers
//   const submitTest = async (testId, answers) => {
//     if (!userId) {
//       throw new Error('User not authenticated. Please log in.');
//     }
//     try {
//       console.log("Submitting test with payload:", { testId, userId, answers }); // Debug
//       const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
//         questionId,
//         selectedAnswer,
//       }));
//       const response = await fetchProtected('http://localhost:5000/api/testresult', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           testId,
//           score: calculateScore(answers),
//           answers: formattedAnswers,
//           completedAt: new Date().toISOString(),
//         }),
//       });
//       const data = await response.json();
//       console.log("Submit test response:", data); // Debug
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to submit test');
//       }
//       return data.testResult;
//     } catch (error) {
//       console.error('Error submitting test:', error);
//       throw error;
//     }
//   };

//   // Helper function to calculate score (placeholder)
//   const calculateScore = (answers) => {
//     return Object.values(answers).filter(ans => ans).length; // Count non-empty answers
//   };

//   // Fetch all enrolled courses with their resources
//   const fetchEnrolledCourses = async () => {
//     try {
//       const user = await fetchUserProfile();
//       console.log(user);
//       if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
//         return [];
//       }

//       const courses = await Promise.all(
//         user.enrolledCourses.map(async (enrollment) => {
//           const course = await fetchCourseById(enrollment.courseId);
//           const [tests, videos, notes, liveSessions] = await Promise.all([
//             fetchTestsByCourseId(enrollment.courseId),
//             fetchVideosByCourseId(enrollment.courseId),
//             fetchNotesByCourseId(enrollment.courseId),
//             fetchLiveSessionsByCourseId(enrollment.courseId),
//           ]);

//           return {
//             id: course._id,
//             title: course.title,
//             examType: course.examType,
//             thumbnail: course.thumbnail,
//             startDate: course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A',
//             endDate: course.endDate ? new Date(course.endDate).toLocaleDateString() : 'N/A',
//             progress: calculateProgress(tests, enrollment),
//             tests,
//             videos,
//             notes,
//             liveSessions,
//             syllabus: course.about ? course.about.split('\n') : [],
//             mentor: { name: 'Unknown Mentor', bio: 'No bio available' },
//             type: course.type || 'paid', // Default to 'paid' if type is not provided
//           };
//         })
//       );

//       return courses;
//     } catch (error) {
//       console.error('Error fetching enrolled courses:', error);
//       throw error;
//     }
//   };

//   // Helper function to calculate progress
//   const calculateProgress = (tests, enrollment) => {
//     const totalTests = tests.length;
//     const completedTests = tests.filter((test) =>
//       test.results.some((result) => result.userId.toString() === userId)
//     ).length;
//     return totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
//   };

//   // Fetch tests (scheduled or completed)
//   const fetchTests = async (status = 'scheduled') => {
//     try {
//       const user = await fetchUserProfile();
//       if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
//         return [];
//       }

//       const allTests = await Promise.all(
//         user.enrolledCourses.map(async (enrollment) => {
//           const tests = await fetchTestsByCourseId(enrollment.courseId);
//           return tests.map((test) => ({
//             id: test._id,
//             title: test.title,
//             examType: test.examType,
//             date: test.createdAt ? new Date(test.createdAt).toLocaleDateString() : 'N/A',
//             time: test.createdAt ? new Date(test.createdAt).toLocaleTimeString() : 'N/A',
//             status: test.results.some((result) => result.userId.toString() === userId)
//               ? 'Completed'
//               : 'Scheduled',
//             score: test.results.find((result) => result.userId.toString() === userId)?.score || null,
//             duration: test.duration ? `${test.duration} minutes` : 'N/A',
//             markingScheme: test.markingScheme,
//             questions: test.questions.map((q) => ({
//               id: q._id,
//               question: q.text,
//               options: q.options.map((opt) => opt.text),
//               correctAnswer: q.correctAnswer,
//               explanation: q.explanation,
//             })),
//           }));
//         })
//       );

//       const flattenedTests = allTests.flat();
//       return status === 'scheduled'
//         ? flattenedTests.filter((test) => test.status === 'Scheduled')
//         : flattenedTests.filter((test) => test.status === 'Completed');
//     } catch (error) {
//       console.error(`Error fetching ${status} tests:`, error);
//       throw error;
//     }
//   };

//   // Fetch classes (live sessions)
//   const fetchClasses = async () => {
//     try {
//       const user = await fetchUserProfile();
//       if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
//         return [];
//       }

//       const allSessions = await Promise.all(
//         user.enrolledCourses.map(async (enrollment) => {
//           const sessions = await fetchLiveSessionsByCourseId(enrollment.courseId);
//           return sessions.map((session) => ({
//             id: session._id,
//             title: session.title,
//             subject: session.courseId.title,
//             date: session.scheduledAt ? new Date(session.scheduledAt).toLocaleDateString() : 'N/A',
//             time: session.scheduledAt ? new Date(session.scheduledAt).toLocaleTimeString() : 'N/A',
//             platform: session.platform,
//             link: session.link,
//             status: new Date(session.scheduledAt) <= new Date() ? 'Live' : 'Scheduled',
//           }));
//         })
//       );

//       return allSessions.flat();
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//       throw error;
//     }
//   };

//   // Memoize the returned functions to prevent unnecessary re-renders
//   return useMemo(
//     () => ({
//       fetchEnrolledCourses,
//       fetchCourseById,
//       fetchTests,
//       fetchTestById,
//       submitTest,
//       fetchVideosByCourseId,
//       fetchNotesByCourseId,
//       fetchLiveSessionsByCourseId,
//       fetchClasses,
//     }),
//     [
//       fetchEnrolledCourses,
//       fetchCourseById,
//       fetchTests,
//       fetchTestById,
//       submitTest,
//       fetchVideosByCourseId,
//       fetchNotesByCourseId,
//       fetchLiveSessionsByCourseId,
//       fetchClasses,
//     ]
//   );
// };

// export default useApi;

import { useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';

const useApi = () => {
  const { fetchProtected, user } = useContext(AuthContext);
  const userId = user?.userId;

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      throw new Error('User not authenticated or invalid user ID');
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

  // Fetch course by ID
  const fetchCourseById = async (courseId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error('Invalid course ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch course');
      }
      return data.course;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  };

  // Fetch tests for a course
  const fetchTestsByCourseId = async (courseId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error('Invalid course ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/test/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tests');
      }
      return data.tests;
    } catch (error) {
      console.error(`Error fetching tests for course ${courseId}:`, error);
      throw error;
    }
  };

  // Fetch videos for a course
  const fetchVideosByCourseId = async (courseId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error('Invalid course ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/video/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch videos');
      }
      return data.videos;
    } catch (error) {
      console.error(`Error fetching videos for course ${courseId}:`, error);
      throw error;
    }
  };

  // Fetch notes for a course
  const fetchNotesByCourseId = async (courseId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error('Invalid course ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/notes/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }
      return data.notes;
    } catch (error) {
      console.error(`Error fetching notes for course ${courseId}:`, error);
      throw error;
    }
  };

  // Fetch live sessions for a course
  const fetchLiveSessionsByCourseId = async (courseId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error('Invalid course ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/livesession/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch live sessions');
      }
      return data.sessions;
    } catch (error) {
      console.error(`Error fetching live sessions for course ${courseId}:`, error);
      throw error;
    }
  };

  // Fetch test by ID
  const fetchTestById = async (testId) => {
    if (!/^[0-9a-fA-F]{24}$/.test(testId)) {
      throw new Error('Invalid test ID');
    }
    try {
      const response = await fetchProtected(`http://localhost:5000/api/test/${testId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch test');
      }
      return data.test;
    } catch (error) {
      console.error(`Error fetching test ${testId}:`, error);
      throw error;
    }
  };

  // Submit test answers
  const submitTest = async (testId, answers) => {
    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      throw new Error('User not authenticated or invalid user ID');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(testId)) {
      throw new Error('Invalid test ID');
    }
    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      throw new Error('Answers must be a non-empty object');
    }
    try {
      console.log('submitTest: Input:', { testId, userId, answers }); // Debug
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => {
        if (!/^[0-9a-fA-F]{24}$/.test(questionId)) {
          throw new Error(`Invalid question ID: ${questionId}`);
        }
        return {
          questionId,
          selectedAnswer: String(selectedAnswer), // Ensure string
        };
      });

      const body = {
        testId,
        score: calculateScore(answers),
        answers: formattedAnswers,
        completedAt: new Date().toISOString(),
      };
      console.log('submitTest: Request body:', body); // Debug

      const response = await fetchProtected('http://localhost:5000/api/testresult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log('submitTest: Response status:', response.status); // Debug
      const data = await response.json();
      console.log('submitTest: Response data:', data); // Debug
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit test');
      }
      return data.testResult;
    } catch (error) {
      console.error('submitTest: Error:', error.message);
      throw error;
    }
  };

  // Helper function to calculate score (adjust based on backend logic)
  const calculateScore = (answers) => {
    // Placeholder: Count non-empty answers, adjust to match backend scoring
    return Object.values(answers).filter(ans => ans).length;
  };

  // Fetch all enrolled courses with their resources
  const fetchEnrolledCourses = async () => {
    try {
      const user = await fetchUserProfile();
      console.log('fetchEnrolledCourses: User:', user); // Debug
      if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
        return [];
      }

      const courses = await Promise.all(
        user.enrolledCourses.map(async (enrollment) => {
          const course = await fetchCourseById(enrollment.courseId);
          const [tests, videos, notes, liveSessions] = await Promise.all([
            fetchTestsByCourseId(enrollment.courseId),
            fetchVideosByCourseId(enrollment.courseId),
            fetchNotesByCourseId(enrollment.courseId),
            fetchLiveSessionsByCourseId(enrollment.courseId),
          ]);

          return {
            id: course._id,
            title: course.title,
            examType: course.examType,
            thumbnail: course.thumbnail,
            startDate: course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A',
            endDate: course.endDate ? new Date(course.endDate).toLocaleDateString() : 'N/A',
            progress: calculateProgress(tests, enrollment),
            tests,
            videos,
            notes,
            liveSessions,
            syllabus: course.about ? course.about.split('\n') : [],
            mentor: { name: 'Unknown Mentor', bio: 'No bio available' },
            type: course.type || 'paid',
          };
        })
      );

      return courses;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  };

  // Helper function to calculate progress
  const calculateProgress = (tests, enrollment) => {
    const totalTests = tests.length;
    const completedTests = tests.filter((test) =>
      test.results.some((result) => result.userId.toString() === userId)
    ).length;
    return totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
  };

  // Fetch tests (scheduled or completed)
  const fetchTests = async (status = 'scheduled') => {
    try {
      const user = await fetchUserProfile();
      if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
        return [];
      }

      const allTests = await Promise.all(
        user.enrolledCourses.map(async (enrollment) => {
          const tests = await fetchTestsByCourseId(enrollment.courseId);
          return tests.map((test) => ({
            id: test._id,
            title: test.title,
            examType: test.examType,
            date: test.createdAt ? new Date(test.createdAt).toLocaleDateString() : 'N/A',
            time: test.createdAt ? new Date(test.createdAt).toLocaleTimeString() : 'N/A',
            status: test.results.some((result) => result.userId.toString() === userId)
              ? 'Completed'
              : 'Scheduled',
            score: test.results.find((result) => result.userId.toString() === userId)?.score || null,
            duration: test.duration ? `${test.duration} minutes` : 'N/A',
            markingScheme: test.markingScheme,
            questions: test.questions.map((q) => ({
              id: q._id,
              question: q.text,
              options: q.options.map((opt) => opt.text),
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
            })),
          }));
        })
      );

      const flattenedTests = allTests.flat();
      return status === 'scheduled'
        ? flattenedTests.filter((test) => test.status === 'Scheduled')
        : flattenedTests.filter((test) => test.status === 'Completed');
    } catch (error) {
      console.error(`Error fetching ${status} tests:`, error);
      throw error;
    }
  };

  // Fetch classes (live sessions)
  const fetchClasses = async () => {
    try {
      const user = await fetchUserProfile();
      if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
        return [];
      }

      const allSessions = await Promise.all(
        user.enrolledCourses.map(async (enrollment) => {
          const sessions = await fetchLiveSessionsByCourseId(enrollment.courseId);
          return sessions.map((session) => ({
            id: session._id,
            title: session.title,
            subject: session.courseId.title,
            date: session.scheduledAt ? new Date(session.scheduledAt).toLocaleDateString() : 'N/A',
            time: session.scheduledAt ? new Date(session.scheduledAt).toLocaleTimeString() : 'N/A',
            platform: session.platform,
            link: session.link,
            status: new Date(session.scheduledAt) <= new Date() ? 'Live' : 'Scheduled',
          }));
        })
      );

      return allSessions.flat();
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  };

  return useMemo(
    () => ({
      fetchEnrolledCourses,
      fetchCourseById,
      fetchTests,
      fetchTestById,
      submitTest,
      fetchVideosByCourseId,
      fetchNotesByCourseId,
      fetchLiveSessionsByCourseId,
      fetchClasses,
    }),
    [userId] // Recompute only if userId changes
  );
};

export default useApi;