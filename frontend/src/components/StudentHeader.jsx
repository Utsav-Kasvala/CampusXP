import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx';
import { FiHome, FiBook, FiCalendar, FiStar, FiLogOut, FiActivity } from 'react-icons/fi';

const StudentHeader = () => {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-500 shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="flex items-center justify-between w-full max-w-screen mx-auto py-4 px-6 text-white">
        
        {/* Student's Name or Title */}
        <h1 className="text-3xl font-bold text-black bg-white rounded-lg shadow-md px-6 py-4 inline-block">
    {user?.name || "CampusXP"}
</h1>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-base font-medium">
          <Link to="/home" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiHome className="mr-2" /> Home
          </Link>
          <Link to="/join-classroom" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiBook className="mr-2" /> Join a Classroom
          </Link>
          <Link to="/joined-classrooms" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiActivity className="mr-2" /> Joined Classroom
          </Link>
          <Link to="/timeTable" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiCalendar className="mr-2" /> Timetable
          </Link>
          <Link to="/leaderboard" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiStar className="mr-2" /> Leaderboard
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-100 hover:text-red-300 transition-colors duration-300 text-sm font-medium"
        >
          <FiLogOut className="mr-1" /> Logout
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
