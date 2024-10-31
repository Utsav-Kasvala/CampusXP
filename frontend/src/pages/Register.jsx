import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

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

      const { message, studentId } = await res.json(); // Get studentId from the response

      if (!res.ok) {
        setErrorMessage(message || 'Registration failed. Please try again.');
        throw new Error(message);
      }

      // If registration is successful
      setLoading(false);
      console.log("Registered successfully with Student ID:", studentId); // Optionally log the student ID
      navigate('/login');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className='px-5 xl:px-0 bg-gray-100 min-h-screen flex items-center'>
      <div className="max-w-[1050px] mx-auto bg-white shadow-lg rounded-lg p-8">
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>
          Create an <span className='text-blue-500'>Account</span>
        </h3>

        <form onSubmit={submitHandler}>
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
    </section>
  );
}

export default Signup;
