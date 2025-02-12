import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "../components/StarField";
import joincallImg1 from "../assets/images/joincallImg1.webp";

const Joincall = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/conferencecall/callid=${encodeURIComponent(code)}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-blue-700 p-6 mt-9">
      <StarField />
      <div className="relative z-10 w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-10 backdrop-blur-lg bg-opacity-90 border border-gray-200 flex flex-col md:flex-row items-center">
        
        {/* Left Image Section */}
        <div className="w-full md:w-2/5 flex justify-center ">
          <img
            src={joincallImg1}
            alt="Join Call Illustration"
            className="w-64 md:w-80 rounded-lg shadow-lg"
          />
        </div>

        {/* Right Form Section - Slightly More Right & Center-Aligned */}
        <div className="w-full md:w-3/5 flex flex-col items-center justify-center text-center md:text-left mt-6 md:mt-0 md:ml-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
            Join a Call
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here"
              className="p-3 w-72 text-lg border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              className="w-72 bg-violet-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-violet-900 transition-all shadow-md"
            >
              Join Call
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Joincall;
