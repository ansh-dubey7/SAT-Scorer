import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AboutUs = () => {
  return (
     <>
     <Header></Header>
     <section className="bg-white py-8 px-4 md:px-8">

        {/* <div className="text-2xl font-bold tracking-tight ">
          <a href="/" className="hover:text-blue-800 transition-colors duration-200 mx-auto p-3 top-4 bg-gray-200 rounded-lg">
            SAT Scorer
          </a>
        </div> */}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50 py-16 rounded-xl max-w-6xl mx-auto text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500 mb-4 font-serif">
          About SAT Scorer
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Empowering students to achieve their dreams through expert guidance and personalized learning.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto my-20 animate-fadeIn animation-delay-200">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 mb-8 text-center font-serif">
          Our Story
        </h2>
        <div className="flex flex-col md:flex-row gap-8 bg-gray-50 p-8 rounded-xl shadow-sm">
          <div className="md:w-1/2">
            <div className="flex items-start mb-6">
              <span className="text-blue-500 text-2xl mr-4">🎯</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                Founded in 2020, SAT Scorer was born out of a passion to help students excel in international exams like SAT, GRE, GMAT, and IELTS. We understand the challenges students face—whether it’s mastering complex concepts, managing time, or overcoming test anxiety.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 text-2xl mr-4">🌟</span>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to empower every student to achieve their highest potential. With a team of dedicated mentors and cutting-edge resources, we’ve helped over 20,000 students worldwide ace their exams and secure admissions to their dream universities.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-500">20,000+</p>
              <p className="text-lg text-gray-600 mt-2">Students Helped Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto border-t border-gray-200 my-12"></div>

      {/* Mentors Section */}
      <div className="max-w-6xl mx-auto my-20 animate-fadeIn animation-delay-400">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 mb-12 text-center font-serif">
          Meet Our Mentors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Mentor 1 */}
          <div className="relative flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mb-6 border-4 border-blue-100">
              <span className="text-gray-500 text-sm text-center">Photo Placeholder</span>
            </div>
            <h3 className="text-xl font-semibold text-navy-900">
              Dr. Emily Carter
            </h3>
            <p className="text-blue-500 font-medium">
              SAT Math Expert
            </p>
            <p className="text-gray-600 text-center mt-3 leading-relaxed">
              Dr. Carter holds a Ph.D. in Mathematics and has over 15 years of experience teaching SAT Math. She specializes in breaking down complex problems into simple, manageable steps, helping students boost their scores significantly.
            </p>
            <div className="mt-4">
              <a
                href="https://linkedin.com/in/emilycarter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>

          {/* Mentor 2 */}
          <div className="relative flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mb-6 border-4 border-blue-100">
              <span className="text-gray-500 text-sm text-center">Photo Placeholder</span>
            </div>
            <h3 className="text-xl font-semibold text-navy-900">
              Prof. James Lin
            </h3>
            <p className="text-blue-500 font-medium">
              GRE Verbal Specialist
            </p>
            <p className="text-gray-600 text-center mt-3 leading-relaxed">
              With a background in linguistics, Prof. Lin has trained thousands of students to excel in GRE Verbal. His engaging teaching style and focus on vocabulary and critical reading have made him a student favorite.
            </p>
            <div className="mt-4">
              <a
                href="https://linkedin.com/in/jameslin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>

          {/* Mentor 3 */}
          <div className="relative flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mb-6 border-4 border-blue-100">
              <span className="text-gray-500 text-sm text-center">Photo Placeholder</span>
            </div>
            <h3 className="text-xl font-semibold text-navy-900">
              Ms. Priya Sharma
            </h3>
            <p className="text-blue-500 font-medium">
              IELTS Speaking Coach
            </p>
            <p className="text-gray-600 text-center mt-3 leading-relaxed">
              Ms. Sharma is a certified IELTS trainer with a knack for improving speaking skills. She focuses on fluency, pronunciation, and confidence, helping students achieve Band 8+ scores in IELTS Speaking.
            </p>
            <div className="mt-4">
              <a
                href="https://linkedin.com/in/priyasharma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto border-t border-gray-200 my-12"></div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto my-20 text-center animate-fadeIn animation-delay-600">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 mb-6 font-serif">
          Ready to Ace Your Exams?
        </h2>
        <p className="text-gray-700 text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of students who have achieved their dreams with SAT Scorer.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 hover:animate-bounce"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
     </>
  );
};

export default AboutUs;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const AboutUs = () => {
//   return (
//     <section className="bg-white py-12 px-4">
//       {/* Hero Section */}
//       <div className="max-w-5xl mx-auto text-center animate-fadeIn">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-4">
//           About SAT Scorer
//         </h1>
//         <p className="text-lg md:text-xl text-gray-600 mb-8">
//           Empowering students to achieve their dreams through expert guidance and personalized learning.
//         </p>
//       </div>

//       {/* Our Story Section */}
//       <div className="max-w-5xl mx-auto my-16 animate-fadeIn">
//         <h2 className="text-3xl font-semibold text-navy-900 mb-6 text-center">
//           Our Story
//         </h2>
//         <p className="text-gray-600 text-lg leading-relaxed">
//           Founded in 2020, SAT Scorer was born out of a passion to help students excel in international exams like SAT, GRE, GMAT, and IELTS. We understand the challenges students face—whether it’s mastering complex concepts, managing time, or overcoming test anxiety. That’s why we’ve built a platform that combines expert instruction, personalized learning paths, and real test simulations to ensure success.
//         </p>
//         <p className="text-gray-600 text-lg leading-relaxed mt-4">
//           Our mission is simple: to empower every student to achieve their highest potential. With a team of dedicated mentors and cutting-edge resources, we’ve helped over 20,000 students worldwide ace their exams and secure admissions to their dream universities.
//         </p>
//       </div>

//       {/* Mentors Section */}
//       <div className="max-w-5xl mx-auto my-16 animate-fadeIn">
//         <h2 className="text-3xl font-semibold text-navy-900 mb-8 text-center">
//           Meet Our Mentors
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Mentor 1 */}
//           <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
//               <span className="text-gray-500 text-sm">Photo Placeholder</span>
//             </div>
//             <h3 className="text-xl font-semibold text-navy-900">
//               Dr. Emily Carter
//             </h3>
//             <p className="text-blue-500 font-medium">
//               SAT Math Expert
//             </p>
//             <p className="text-gray-600 text-center mt-2">
//               Dr. Carter holds a Ph.D. in Mathematics and has over 15 years of experience teaching SAT Math. She specializes in breaking down complex problems into simple, manageable steps, helping students boost their scores significantly.
//             </p>
//           </div>

//           {/* Mentor 2 */}
//           <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
//               <span className="text-gray-500 text-sm">Photo Placeholder</span>
//             </div>
//             <h3 className="text-xl font-semibold text-navy-900">
//               Prof. James Lin
//             </h3>
//             <p className="text-blue-500 font-medium">
//               GRE Verbal Specialist
//             </p>
//             <p className="text-gray-600 text-center mt-2">
//               With a background in linguistics, Prof. Lin has trained thousands of students to excel in GRE Verbal. His engaging teaching style and focus on vocabulary and critical reading have made him a student favorite.
//             </p>
//           </div>

//           {/* Mentor 3 */}
//           <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
//               <span className="text-gray-500 text-sm">Photo Placeholder</span>
//             </div>
//             <h3 className="text-xl font-semibold text-navy-900">
//               Ms. Priya Sharma
//             </h3>
//             <p className="text-blue-500 font-medium">
//               IELTS Speaking Coach
//             </p>
//             <p className="text-gray-600 text-center mt-2">
//               Ms. Sharma is a certified IELTS trainer with a knack for improving speaking skills. She focuses on fluency, pronunciation, and confidence, helping students achieve Band 8+ scores in IELTS Speaking.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="max-w-5xl mx-auto my-16 text-center animate-fadeIn">
//         <h2 className="text-3xl font-semibold text-navy-900 mb-4">
//           Ready to Ace Your Exams?
//         </h2>
//         <p className="text-gray-600 text-lg mb-6">
//           Join thousands of students who have achieved their dreams with SAT Scorer.
//         </p>
//         <Link
//           to="/signup"
//           className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-all duration-300"
//         >
//           Get Started
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;