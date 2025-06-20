import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CourseCard = ({ course }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!user) {
      alert('Please log in to purchase this course.');
      navigate('/login');
      return;
    }
    const confirmPurchase = window.confirm(`Are you sure you want to buy "${course.title}" for ₹${course.price}?`);
    if (confirmPurchase) {
      navigate(`/checkout/${course.id}`);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-101 hover:shadow-2xl ${
        course.isFeatured ? 'border-4 border-yellow-400' : ''
      }`}
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          ONLINE
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {course.examType}
        </div>
        {course.isFeatured && (
          <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 transform -rotate-45 -translate-x-4 translate-y-4">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {course.about}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {course.startDate} - {course.endDate}
          </span>
          <span className="font-extrabold text-purple-700 text-lg">₹{course.price}</span>
        </div>

        <div className="flex justify-between space-x-4">
          <Link
            to={`/coursedetails/${course.id}`}
            className="flex-1 text-center px-4 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 hover:border-purple-700 transition transform hover:scale-105"
          >
            Explore
          </Link>
          <button
            onClick={handleBuyNow}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;