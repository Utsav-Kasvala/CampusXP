import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarField from '../components/StarField';
const Joincall = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (code.trim()) {
        navigate(`/conferencecall/callid=${encodeURIComponent(code)}`);
      }
    };
  
    return (
      <div className="relative min-h-screen justify-center flex flex-col items-center p-6 mt-5 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
      <StarField/>
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-90">

          <h1 className="text-2xl font-bold mb-6">Enter Code</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here"
              className="p-2 w-64 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
          </div>
        </div>
      );
}

export default Joincall