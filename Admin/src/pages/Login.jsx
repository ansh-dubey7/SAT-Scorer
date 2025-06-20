import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login request
        const response = await axios.post('http://localhost:5000/api/user/login', {
          email,
          password,
        });
        if (response.data.message === 'Login successful') {
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Signup request
        const response = await axios.post('http://localhost:5000/api/user/register', {
          name,
          email,
          password,
          role: 'admin', // Force admin role for signup
        });
        if (response.data.message === 'User registered successfully') {
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Admin Login' : 'Admin Signup'}</h1>
        <form onSubmit={onSubmitHandler}>
          {!isLogin && (
            <div className="mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                placeholder="Your Name"
                required
              />
            </div>
          )}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const onSubmitHandler = async (e) => {
//     try {
//       e.preventDefault();
//       const response = await axios.post('http://localhost:5000/api/user/admin', { email, password });
//       if (response.data.success) {
//         setToken(response.data.token);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center w-full">
//       <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="email"
//               placeholder="your@email.com"
//               required
//             />
//           </div>
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="password"
//               placeholder="password"
//               required
//             />
//           </div>
//           <button
//             className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;