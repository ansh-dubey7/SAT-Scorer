import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/viewcourse/BackButton';
import CourseTabs from '../components/viewcourse/CourseTabs';
import CourseContentList from '../components/viewcourse/CourseContentList';
import VideoModal from '../components/viewcourse/VideoModal';
import useApi from '../Data/api';

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { fetchCourseById } = useApi();

  const loadCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasError(false);
      const data = await fetchCourseById(id);
      const transformedCourse = {
        id: data._id,
        title: data.title,
        examType: data.examType,
        startDate: data.startDate ? new Date(data.startDate).toLocaleDateString() : 'N/A',
        endDate: data.endDate ? new Date(data.endDate).toLocaleDateString() : 'N/A',
        syllabus: data.about ? data.about.split('.').map(item => item.trim()).filter(item => item) : [],
        mentor: { name: 'Unknown', bio: 'No bio available' },
        modules: [
          {
            id: 'videos',
            title: 'Videos',
            items: (data.videos || []).map(video => ({
              id: video._id,
              title: video.title,
              videoId: video.link,
              type: 'video',
            })),
          },
          {
            id: 'notes',
            title: 'Study Materials',
            items: (data.notes || []).map(note => ({
              id: note._id,
              title: note.title,
              fileUrl: note.link,
              type: 'material',
            })),
          },
          {
            id: 'liveSessions',
            title: 'Live Sessions',
            items: (data.liveSessions || []).map(session => ({
              id: session._id,
              title: session.title,
              link: session.link,
              platform: session.platform,
              scheduledAt: session.scheduledAt ? new Date(session.scheduledAt).toLocaleString() : 'N/A',
              type: 'liveSession',
            })),
          },
        ],
      };
      setCourse(transformedCourse);
    } catch (err) {
      setError(err.message || 'Failed to load course');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasError) {
      loadCourse();
    }
  }, [id, hasError]);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return (
    <div className="p-6 text-red-600">
      <p>{error}</p>
      <button
        onClick={loadCourse}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
  if (!course) return <div className="p-6 text-gray-600">Course not found.</div>;

  return (
    <div className="p-6">
      {/* <BackButton to="/studentdashboard/mycourses" label="Back to My Courses" /> */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{course.title}</h1>
      <CourseTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['overview', 'lectures', 'materials', 'liveSessions']}
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {course.modules
            .filter(module => 
              (activeTab === 'lectures' && module.id === 'videos') ||
              (activeTab === 'materials' && module.id === 'notes') ||
              (activeTab === 'liveSessions' && module.id === 'liveSessions')
            )
            .map(module => (
              <div key={module.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-4">{module.title}</h2>
                {module.id === 'liveSessions' && module.items.length === 0 ? (
                  <p className="text-gray-600">No live sessions available.</p>
                ) : module.items.length === 0 ? (
                  <p className="text-gray-600">
                    {module.id === 'videos' ? 'No videos available.' : 'No notes available.'}
                  </p>
                ) : (
                  <CourseContentList
                    modules={[module]}
                    activeTab={activeTab}
                    onVideoSelect={setSelectedVideoId}
                  />
                )}
              </div>
            ))}
        </div>
      )}
      <VideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </div>
  );
};

export default ViewCourse;