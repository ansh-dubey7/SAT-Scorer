// import axios from 'axios';

// const API_BASE_URL = 'https://your-api.com';

// // Mock user profile
// const mockUserProfile = {
//   id: '1',
//   name: 'John',
//   email: 'john.doe@example.com',
//   profilePicture: 'https://ui-avatars.com/api/?name=John&background=purple-200&color=indigo-900',
// };

// // Mock in-memory store for tests
// let mockTests = [
//   {
//     id: '1',
//     title: 'SAT Mock Test 1',
//     examType: 'SAT',
//     date: '2025-06-10',
//     time: '10:00 AM',
//     status: 'Scheduled',
//     duration: '90 mins',
//     markingScheme: '+1 for correct, 0 for incorrect',
//     questions: [
//       { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', explanation: 'Basic arithmetic: 2 + 2 equals 4.' },
//       { id: 2, question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correctAnswer: '2', explanation: 'Subtraction: 5 - 3 equals 2.' },
//     ],
//   },
//   {
//     id: '2',
//     title: 'GRE Diagnostic Test',
//     examType: 'GRE',
//     date: '2025-06-15',
//     time: '2:00 PM',
//     status: 'Scheduled',
//     duration: '30 mins',
//     markingScheme: '+1 for correct, 0 for incorrect',
//     questions: [
//       { id: 1, question: 'What is the synonym of big?', options: ['Small', 'Large', 'Tiny', 'Short'], correctAnswer: 'Large', explanation: 'Large is a synonym for big.' },
//     ],
//   },
//   {
//     id: '3',
//     title: 'IELTS Practice Test 1',
//     examType: 'IELTS',
//     date: '2025-05-25',
//     time: '11:50 AM',
//     status: 'Completed',
//     duration: '60 mins',
//     markingScheme: '+1 for correct, 0 for incorrect',
//     score: '2/2',
//     answers: { 1: 'Paris', 2: '2' },
//     questions: [
//       { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris', explanation: 'Paris is the capital city of France.' },
//       { id: 2, question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correctAnswer: '2', explanation: 'Subtraction: 5 - 3 equals 2.' },
//     ],
//   },
// ];

// // Mock notifications
// const mockNotifications = [
//   {
//     id: '1',
//     title: 'SAT Mock Test Reminder',
//     message: 'Your SAT Mock Test 1 is scheduled for tomorrow at 10:00 AM.',
//     timestamp: '2025-05-26 09:00 AM',
//     action: { label: 'View Test', link: '/test/start/1' },
//   },
//   {
//     id: '2',
//     title: 'New Course Available',
//     message: 'GRE Fundamentals course has been added to your account.',
//     timestamp: '2025-05-25 02:30 PM',
//     action: { label: 'View Course', link: '/course/2' },
//   },
//   {
//     id: '3',
//     title: 'Class Scheduled',
//     message: 'Join the live IELTS Speaking Practice class today at 10:00 AM.',
//     timestamp: '2025-05-26 10:00 AM',
//     action: { label: 'Join Now', link: 'https://zoom.us/live-ielts-speaking' },
//   },
// ];

// export const fetchCourses = async (type) => {
//   const mockPaidCourses = [
//     { id: '1', thumbnail: '/assets/images/sat-thumb.jpg', title: 'SAT Full Prep', examType: 'SAT', startDate: '2025-06-01', endDate: '2025-08-31', progress: 60 },
//     { id: '2', thumbnail: '/assets/images/gre-thumb.jpg', title: 'GRE Crash Course', examType: 'GRE', startDate: '2025-07-01', endDate: '2025-09-15', progress: 30 },
//   ];
//   const mockFreeCourses = [
//     { id: '3', thumbnail: '/assets/images/ielts-thumb.jpg', title: 'IELTS Basics', examType: 'IELTS', startDate: '2025-05-20', endDate: '2025-07-30', progress: 90 },
//     { id: '4', thumbnail: '/assets/images/sat-thumb.jpg', title: 'SAT Foundation', examType: 'SAT', startDate: '2025-06-10', endDate: '2025-08-01', progress: 40 },
//   ];
//   return type === 'paid' ? mockPaidCourses : mockFreeCourses;
// };

// export const fetchTests = async (status) => {
//   return mockTests.filter((test) => test.status.toLowerCase() === status);
// };

// export const fetchClasses = async (status) => {
//   const liveClasses = [
//     { id: '1', title: 'Live IELTS Speaking Practice', subject: 'IELTS - Speaking', date: '2025-05-26', time: '10:00 AM', platform: 'Zoom', status: 'Live', link: 'https://zoom.us/live-ielts-speaking' },
//   ];
//   const upcomingClasses = [
//     { id: '2', title: 'SAT Math Intensive', subject: 'SAT - Mathematics', date: '2025-05-28', time: '4:00 PM', platform: 'Google Meet', status: 'Upcoming', link: 'https://meet.google.com/upcoming-sat-math' },
//     { id: '3', title: 'GRE Verbal Strategies', subject: 'GRE - Verbal', date: '2025-06-01', time: '6:00 PM', platform: 'Zoom', status: 'Upcoming', link: 'https://zoom.us/gre-verbal-class' },
//   ];
//   return status === 'live' ? liveClasses : upcomingClasses;
// };

// export const fetchCourseById = async (id) => {
//   const mockCourses = [
//     {
//       id: '1',
//       thumbnail: '/assets/images/sat-thumb.jpg',
//       title: 'SAT Full Prep',
//       examType: 'SAT',
//       startDate: '2025-06-01',
//       endDate: '2025-08-31',
//       progress: 60,
//       syllabus: ['Algebra', 'Geometry', 'Reading', 'Writing'],
//       mentor: { name: 'Dr. Jane Smith', bio: 'Experienced SAT tutor with 10 years of teaching.' },
//       modules: [
//         {
//           title: 'Module 1: Introduction',
//           videos: [
//             { title: 'Welcome Video', id: 'zZ6vybT1HQs', duration: '10 mins' },
//             { title: 'Test Overview', id: 'dQw4w9WgXcQ', duration: '8 mins' },
//           ],
//           materials: [
//             { title: 'Course Notes', fileUrl: '/assets/notes.pdf' },
//             { title: 'Practice Sheet', fileUrl: '/assets/practice.pdf' },
//           ],
//         },
//         {
//           title: 'Module 2: Math Prep',
//           videos: [
//             { title: 'Algebra Basics', id: 'mZ3aRXlb7C8', duration: '12 mins' },
//             { title: 'Functions Deep Dive', id: 'rVzLZIy1ybg', duration: '15 mins' },
//           ],
//           materials: [
//             { title: 'Math Notes', fileUrl: '/assets/math-notes.pdf' },
//           ],
//         },
//       ],
//     },
//     {
//       id: '2',
//       thumbnail: '/assets/images/gre-thumb.jpg',
//       title: 'GRE Crash Course',
//       examType: 'GRE',
//       startDate: '2025-07-01',
//       endDate: '2025-09-15',
//       progress: 30,
//       syllabus: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
//       mentor: { name: 'Prof. John Doe', bio: 'GRE expert with 8 years of coaching experience.' },
//       modules: [
//         {
//           title: 'Module 1: Verbal Basics',
//           videos: [
//             { title: 'Vocabulary Building', id: 'aBcDeFgHiJk', duration: '12 mins' },
//           ],
//           materials: [
//             { title: 'Verbal Notes', fileUrl: '/assets/verbal-notes.pdf' },
//           ],
//         },
//       ],
//     },
//   ];
//   return mockCourses.find((c) => c.id === id) || null;
// };

// export const fetchTestById = async (id) => {
//   return mockTests.find((t) => t.id === id) || null;
// };

// export const submitTest = async (testId, answers) => {
//   const test = mockTests.find((t) => t.id === testId);
//   if (!test) throw new Error('Test not found');

//   // Calculate score (unanswered questions score 0)
//   const score = test.questions.reduce((acc, q) => {
//     const userAnswer = answers[q.id] || null;
//     const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
//     return acc + (userAnswer === correctAnswer ? 1 : 0);
//   }, 0);

//   // Update test status and store answers
//   const updatedTest = {
//     ...test,
//     status: 'Completed',
//     score: `${score}/${test.questions.length}`,
//     answers,
//   };

//   // Update mockTests array
//   mockTests = mockTests.map((t) => (t.id === testId ? updatedTest : t));

//   return updatedTest;
// };

// export const fetchNotifications = async () => {
//   return mockNotifications;
// };

// export const fetchUserProfile = async () => {
//   return mockUserProfile;
// };

// export const updateUserProfile = async (updatedProfile) => {
//   mockUserProfile.name = updatedProfile.name;
//   mockUserProfile.email = updatedProfile.email;
//   mockUserProfile.profilePicture = updatedProfile.profilePicture;
//   return mockUserProfile;
// };
import axios from 'axios';

const API_BASE_URL = 'https://your-api.com';

// Mock user profile
const mockUserProfile = {
  id: '1',
  name: 'John',
  email: 'john.doe@example.com',
  profilePicture: 'https://ui-avatars.com/api/?name=John&background=purple-200&color=indigo-900',
};

// Mock in-memory store for tests
let mockTests = [
  {
    id: '1',
    title: 'SAT Mock Test 1',
    examType: 'SAT',
    date: '2025-06-10',
    time: '10:00 AM',
    status: 'Scheduled',
    duration: '90 mins',
    markingScheme: '+1 for correct, 0 for incorrect',
    questions: [
      { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', explanation: 'Basic arithmetic: 2 + 2 equals 4.' },
      { id: 2, question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correctAnswer: '2', explanation: 'Subtraction: 5 - 3 equals 2.' },
    ],
  },
  {
    id: '2',
    title: 'GRE Diagnostic Test',
    examType: 'GRE',
    date: '2025-06-15',
    time: '2:00 PM',
    status: 'Scheduled',
    duration: '30 mins',
    markingScheme: '+1 for correct, 0 for incorrect',
    questions: [
      { id: 1, question: 'What is the synonym of big?', options: ['Small', 'Large', 'Tiny', 'Short'], correctAnswer: 'Large', explanation: 'Large is a synonym for big.' },
    ],
  },
  {
    id: '3',
    title: 'IELTS Practice Test 1',
    examType: 'IELTS',
    date: '2025-05-25',
    time: '11:50 AM',
    status: 'Completed',
    duration: '60 mins',
    markingScheme: '+1 for correct, 0 for incorrect',
    score: '2/2',
    answers: { 1: 'Paris', 2: '2' },
    questions: [
      { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris', explanation: 'Paris is the capital city of France.' },
      { id: 2, question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correctAnswer: '2', explanation: 'Subtraction: 5 - 3 equals 2.' },
    ],
  },
];

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    title: 'SAT Mock Test Reminder',
    message: 'Your SAT Mock Test 1 is scheduled for tomorrow at 10:00 AM.',
    timestamp: '2025-05-26 09:00 AM',
    action: { label: 'View Test', link: '/test/start/1' },
  },
  {
    id: '2',
    title: 'New Course Available',
    message: 'GRE Fundamentals course has been added to your account.',
    timestamp: '2025-05-25 02:30 PM',
    action: { label: 'View Course', link: '/course/2' },
  },
  {
    id: '3',
    title: 'Class Scheduled',
    message: 'Join the live IELTS Speaking Practice class today at 10:00 AM.',
    timestamp: '2025-05-26 10:00 AM',
    action: { label: 'Join Now', link: 'https://zoom.us/live-ielts-speaking' },
  },
];

// Mock classes for fetchClasses
const mockClasses = [
  { id: 1, title: "SAT Math Workshop", examType: "SAT", date: "2025-06-01", time: "10:00 AM", instructor: "Dr. Smith" },
  { id: 2, title: "GRE Verbal Prep", examType: "GRE", date: "2025-06-02", time: "2:00 PM", instructor: "Prof. Jones" },
  { id: 3, title: "IELTS Speaking Session", examType: "IELTS", date: "2025-06-03", time: "4:00 PM", instructor: "Ms. Brown" },
  { id: 4, title: "GMAT Quant Review", examType: "GMAT", date: "2025-06-04", time: "11:00 AM", instructor: "Mr. Wilson" },
];

// Mock exams for fetchExamDetails
const mockExams = {
  sat: {
    title: "SAT",
    description: "The SAT is a standardized test for college admissions in the United States.",
    syllabus: ["Reading", "Writing and Language", "Math (No Calculator)", "Math (Calculator)"],
  },
  gre: {
    title: "GRE",
    description: "The GRE is a graduate school admissions test measuring verbal, quantitative, and analytical skills.",
    syllabus: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
  },
  gmat: {
    title: "GMAT",
    description: "The GMAT is used for business school admissions, testing analytical and quantitative skills.",
    syllabus: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
  },
  ielts: {
    title: "IELTS",
    description: "IELTS tests English proficiency for study, work, or migration.",
    syllabus: ["Listening", "Reading", "Writing", "Speaking"],
  },
  ap: {
    title: "AP",
    description: "Advanced Placement exams for college credit.",
    syllabus: ["Varies by subject"],
  },
  acp: {
    title: "ACP",
    description: "Advanced Certificate Program for specialized skills.",
    syllabus: ["Custom modules"],
  },
};

export const fetchCourses = async (type) => {
  const mockPaidCourses = [
    { id: '1', thumbnail: '/assets/images/sat-thumb.jpg', title: 'SAT Full Prep', examType: 'SAT', startDate: '2025-06-01', endDate: '2025-08-31', progress: 60 },
    { id: '2', thumbnail: '/assets/images/gre-thumb.jpg', title: 'GRE Crash Course', examType: 'GRE', startDate: '2025-07-01', endDate: '2025-09-15', progress: 30 },
  ];
  const mockFreeCourses = [
    { id: '3', thumbnail: '/assets/images/ielts-thumb.jpg', title: 'IELTS Basics', examType: 'IELTS', startDate: '2025-05-20', endDate: '2025-07-30', progress: 90 },
    { id: '4', thumbnail: '/assets/images/sat-thumb.jpg', title: 'SAT Foundation', examType: 'SAT', startDate: '2025-06-10', endDate: '2025-08-01', progress: 40 },
  ];
  return type === 'paid' ? mockPaidCourses : mockFreeCourses;
};

export const fetchTests = async (status) => {
  return mockTests.filter((test) => test.status.toLowerCase() === status);
};

export const fetchClassesByStatus = async (status) => {
  const liveClasses = [
    { id: '1', title: 'Live IELTS Speaking Practice', subject: 'IELTS - Speaking', date: '2025-05-26', time: '10:00 AM', platform: 'Zoom', status: 'Live', link: 'https://zoom.us/live-ielts-speaking' },
  ];
  const upcomingClasses = [
    { id: '2', title: 'SAT Math Intensive', subject: 'SAT - Mathematics', date: '2025-05-28', time: '4:00 PM', platform: 'Google Meet', status: 'Upcoming', link: 'https://meet.google.com/upcoming-sat-math' },
    { id: '3', title: 'GRE Verbal Strategies', subject: 'GRE - Verbal', date: '2025-06-01', time: '6:00 PM', platform: 'Zoom', status: 'Upcoming', link: 'https://zoom.us/gre-verbal-class' },
  ];
  return status === 'live' ? liveClasses : upcomingClasses;
};

export const fetchClasses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClasses), 500);
  });
};

export const fetchCourseById = async (id) => {
  const mockCourses = [
    {
      id: '1',
      thumbnail: '/assets/images/sat-thumb.jpg',
      title: 'SAT Full Prep',
      examType: 'SAT',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      progress: 60,
      syllabus: ['Algebra', 'Geometry', 'Reading', 'Writing'],
      mentor: { name: 'Dr. Jane Smith', bio: 'Experienced SAT tutor with 10 years of teaching.' },
      modules: [
        {
          title: 'Module 1: Introduction',
          videos: [
            { title: 'Welcome Video', id: 'zZ6vybT1HQs', duration: '10 mins' },
            { title: 'Test Overview', id: 'dQw4w9WgXcQ', duration: '8 mins' },
          ],
          materials: [
            { title: 'Course Notes', fileUrl: '/assets/notes.pdf' },
            { title: 'Practice Sheet', fileUrl: '/assets/practice.pdf' },
          ],
        },
        {
          title: 'Module 2: Math Prep',
          videos: [
            { title: 'Algebra Basics', id: 'mZ3aRXlb7C8', duration: '12 mins' },
            { title: 'Functions Deep Dive', id: 'rVzLZIy1ybg', duration: '15 mins' },
          ],
          materials: [
            { title: 'Math Notes', fileUrl: '/assets/math-notes.pdf' },
          ],
        },
      ],
    },
    {
      id: '2',
      thumbnail: '/assets/images/gre-thumb.jpg',
      title: 'GRE Crash Course',
      examType: 'GRE',
      startDate: '2025-07-01',
      endDate: '2025-09-15',
      progress: 30,
      syllabus: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
      mentor: { name: 'Prof. John Doe', bio: 'GRE expert with 8 years of coaching experience.' },
      modules: [
        {
          title: 'Module 1: Verbal Basics',
          videos: [
            { title: 'Vocabulary Building', id: 'aBcDeFgHiJk', duration: '12 mins' },
          ],
          materials: [
            { title: 'Verbal Notes', fileUrl: '/assets/verbal-notes.pdf' },
          ],
        },
      ],
    },
  ];
  return mockCourses.find((c) => c.id === id) || null;
};

export const fetchTestById = async (id) => {
  return mockTests.find((t) => t.id === id) || null;
};

export const submitTest = async (testId, answers) => {
  const test = mockTests.find((t) => t.id === testId);
  if (!test) throw new Error('Test not found');

  // Calculate score (unanswered questions score 0)
  const score = test.questions.reduce((acc, q) => {
    const userAnswer = answers[q.id] || null;
    const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
    return acc + (userAnswer === correctAnswer ? 1 : 0);
  }, 0);

  // Update test status and store answers
  const updatedTest = {
    ...test,
    status: 'Completed',
    score: `${score}/${test.questions.length}`,
    answers,
  };

  // Update mockTests array
  mockTests = mockTests.map((t) => (t.id === testId ? updatedTest : t));

  return updatedTest;
};

export const fetchNotifications = async () => {
  return mockNotifications;
};

export const fetchUserProfile = async () => {
  return mockUserProfile;
};

export const updateUserProfile = async (updatedProfile) => {
  mockUserProfile.name = updatedProfile.name;
  mockUserProfile.email = updatedProfile.email;
  mockUserProfile.profilePicture = updatedProfile.profilePicture;
  return mockUserProfile;
};

export const fetchExamDetails = async (examType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exam = mockExams[examType.toLowerCase()];
      resolve(exam || {});
    }, 500);
  });
};