import React, { useState } from 'react';
import CreateCourseForm from '../components/course/CreateCourseForm';
import CourseContentTab from '../components/course/CourseContentTab';
import ManageCoursesTable from '../components/course/ManageCoursesTable';

const CourseManagement = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header and Tabs */}
      <div className="sticky top-20 z-10 bg-white shadow-md border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 p-4">Course Management Dashboard</h1>
        <div className="flex border-b border-gray-200 px-4">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
              activeTab === 'create'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Create Course
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
              activeTab === 'content'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upload Content
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
              activeTab === 'manage'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Manage Courses
          </button>
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'create' && <CreateCourseForm />}
        {activeTab === 'content' && <CourseContentTab />}
        {activeTab === 'manage' && <ManageCoursesTable />}
      </div>
    </div>
  );
};

export default CourseManagement;



