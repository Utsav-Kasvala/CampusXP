import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { authContext } from '../context/AuthContext';
import signupImg from '../assets/images/signup.gif'; // Add your signup image here

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const { message, studentId, token, role, data } = await res.json();

      if (!res.ok) {
        setErrorMessage(message || 'Registration failed. Please try again.');
        throw new Error(message);
      }

      // Dispatch login success with user data, token, role, and studentId
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data,
          token: token,
          role: role,
          studentId: studentId || null,
        },
      });

      console.log("Registered successfully with Student ID:", studentId); // Optionally log the student ID

      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className='flex h-screen'>
      {/* Left Image Section */}
      <div className="hidden lg:block w-1/2 overflow-hidden relative">
        <img
          src={signupImg}
          alt="Signup"
          className="object-cover w-full h-full absolute top-0 left-0"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Signup Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md w-full">
          <h3 className='text-2xl font-bold text-gray-800 mb-6'>
            Create an <span className='text-blue-500'>Account</span>
          </h3>

          <form onSubmit={submitHandler}>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Display error message */}

            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formdata.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formdata.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formdata.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Are you a:
                <select
                  name="role"
                  value={formdata.role}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                </select>
              </label>
            </div>

            <div className="mt-6">
              <button
                disabled={loading}
                type="submit"
                className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-800'} transition duration-300`}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>

            <p className="mt-4 text-center">
              Already have an Account? <Link to='/Login' className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
