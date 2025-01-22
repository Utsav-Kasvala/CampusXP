import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";
import loginImg from '../assets/images/login.gif'




const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new submission

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      // Dispatch login success with user data, token, role, and studentId
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data, // Assuming this includes the student's data
          token: result.token,
          role: result.role,
          studentId: result.data.studentId || null, // Include studentId from result
        },
      });

      console.log(result, "login data");

      // Navigate based on user role
      if (result.role === "student") {
        navigate('/studentdashboard');
      } else if (result.role === "professor") {
        navigate('/professordashboard');
      }
    } catch (err) {
      setError(err.message); // Set error message to display
    } finally {
      setLoading(false); // Always reset loading state
    }
  };


  return (
    <section className="flex h-screen ">
      {/* Left Image Section */}
      <div className="hidden lg:block w-1/2 ">
        <img
          src={loginImg}
          alt="Login"
          className="w-full h-full object-cover mt-28"
          style={{ maxWidth: '680px', maxHeight: '428px' }}
        />
      </div>
        

      {/* Right Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md w-full">
         
          <h3 className="text-4xl font-bold mb-6 text-center">Login to Your Account</h3>
          <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mb-5 text-right">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-7">
              <button
                disabled={loading} // Disable button when loading
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
              >
               {loading ? "Loading..." : "Submit"} {/* Show loading text */}
              </button>
            </div>
            
            
           
            <p className="mt-4 text-center">Don&apos;t have an Account? 👉 <Link to='/Register' className="text-blue-500">Register</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
