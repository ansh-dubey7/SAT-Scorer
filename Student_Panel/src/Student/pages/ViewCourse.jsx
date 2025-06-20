import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import CourseTabs from '../components/viewcourse/CourseTabs';
import CourseContentList from '../components/viewcourse/CourseContentList';
import VideoModal from '../components/viewcourse/VideoModal';
import { fetchCourseById } from '../../Data/api';

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        setError('Course not found');
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!course) return <div className="p-6 text-gray-600">Course not found.</div>;

  return (
    <div className="p-6">
      <BackButton to="/studentdashboard/mycourses" label="Back to My Courses" />
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{course.title}</h1>
      <CourseTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['overview', 'lectures', 'materials']}
      />
      {activeTab === 'overview' ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
          <p className="text-gray-600 mb-2"><strong>Exam Type:</strong> {course.examType}</p>
          <p className="text-gray-600 mb-2"><strong>Duration:</strong> {course.startDate} - {course.endDate}</p>
          <h3 className="text-lg font-semibold mb-2">Syllabus</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-600">
            {course.syllabus?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">About the Mentor</h3>
          <p className="text-gray-600"><strong>Name:</strong> {course.mentor?.name}</p>
          <p className="text-gray-600">{course.mentor?.bio}</p>
        </div>
      ) : (
        <CourseContentList
          modules={course.modules}
          activeTab={activeTab}
          onVideoSelect={setSelectedVideoId}
        />
      )}
      <VideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </div>
  );
};

export default ViewCourse;




// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import BackButton from "../components/viewcourse/BackButton";
// import CourseTabs from "../components/viewcourse/CourseTabs";
// import CourseContentList from "../components/viewcourse/CourseContentList";
// import VideoModal from "../components/viewcourse/VideoModal";

// // Mock data for courses (materials are empty, progress kept but not displayed)
// const mockCourses = [
//   {
//     id: "1",
//     thumbnail: "/assets/images/sat-thumb.jpg",
//     title: "SAT Full Prep",
//     examType: "SAT",
//     startDate: "2025-06-01",
//     endDate: "2025-08-31",
//     progress: 60, // Kept in data but not displayed
//     modules: [
//       {
//         title: "Module 1: Introduction",
//         videos: [
//           { title: "Welcome Video", id: "zZ6vybT1HQs", duration: "10 mins" },
//           { title: "Test Overview", id: "dQw4w9WgXcQ", duration: "8 mins" }
//         ],
//         materials: [] // Empty as PDFs are not available
//       },
//       {
//         title: "Module 2: Math Prep",
//         videos: [
//           { title: "Algebra Basics", id: "mZ3aRXlb7C8", duration: "12 mins" },
//           { title: "Functions Deep Dive", id: "rVzLZIy1ybg", duration: "15 mins" }
//         ],
//         materials: [] // Empty as PDFs are not available
//       }
//     ]
//   },
//   {
//     id: "2",
//     thumbnail: "/assets/images/gre-thumb.jpg",
//     title: "GRE Crash Course",
//     examType: "GRE",
//     startDate: "2025-07-01",
//     endDate: "2025-09-15",
//     progress: 30,
//     modules: [
//       {
//         title: "Module 1: GRE Basics",
//         videos: [
//           { title: "GRE Intro", id: "a1b2c3d4e5f6", duration: "9 mins" },
//           { title: "GRE Strategies", id: "g6h5i4j3k2l1", duration: "11 mins" }
//         ],
//         materials: [] // Empty as PDFs are not available
//       }
//     ]
//   },
//   {
//     id: "3",
//     thumbnail: "/assets/images/ielts-thumb.jpg",
//     title: "IELTS Basics",
//     examType: "IELTS",
//     startDate: "2025-05-20",
//     endDate: "2025-07-30",
//     progress: 90,
//     modules: [
//       {
//         title: "Module 1: IELTS Overview",
//         videos: [
//           { title: "IELTS Intro", id: "m1n2o3p4q5r6", duration: "7 mins" }
//         ],
//         materials: [] // Empty as PDFs are not available
//       }
//     ]
//   },
//   {
//     id: "4",
//     thumbnail: "/assets/images/sat-thumb.jpg",
//     title: "SAT Foundation",
//     examType: "SAT",
//     startDate: "2025-06-10",
//     endDate: "2025-08-01",
//     progress: 40,
//     modules: [
//       {
//         title: "Module 1: SAT Essentials",
//         videos: [
//           { title: "SAT Basics", id: "s1t2u3v4w5x6", duration: "10 mins" }
//         ],
//         materials: [] // Empty as PDFs are not available
//       }
//     ]
//   }
// ];

// const ViewCourse = () => {
//   const { id } = useParams();
//   const [selectedVideoId, setSelectedVideoId] = useState(null);
//   const [activeTab, setActiveTab] = useState("lectures");

//   // Find the course by ID
//   const course = mockCourses.find((c) => c.id === id);

//   if (!course) {
//     return <div className="p-6 text-gray-800">Course not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <BackButton />
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">
//         Course Title: {course.title}
//       </h1>

//       <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <CourseContentList
//         modules={course.modules}
//         activeTab={activeTab}
//         onVideoSelect={setSelectedVideoId}
//       />
//       <VideoModal
//         videoId={selectedVideoId}
//         onClose={() => setSelectedVideoId(null)}
//       />
//     </div>
//   );
// };

// export default ViewCourse;







 