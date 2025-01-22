import React, { useState } from 'react';
import { BASE_URL } from '../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const API_URL = `${BASE_URL}/reset/forgot-password`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(email)
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Forgot Password</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Request Password Reset
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
