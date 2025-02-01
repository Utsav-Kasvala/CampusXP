import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx';
import { FiHome, FiBook, FiPlusSquare, FiLogOut,FiVideo } from 'react-icons/fi';
import { FaPuzzlePiece } from 'react-icons/fa';

const ProfessorHeader = () => {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 to-blue-400 shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="flex items-center justify-between w-full max-w-screen mx-auto py-4 px-6 text-white">
        
        {/* Professor's Name or Title */}
        <nav>
                <Link to="/profProfile">
                <h1 className="text-3xl font-bold text-black bg-white rounded-lg shadow-md px-6 py-4 inline-block transform transition-all duration-300 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {user?.name || "CampusXP"}
          </h1>
        </Link>
        </nav>


        {/* Navigation Links */}
        <nav className="flex space-x-8 text-base font-medium">
          <Link to="/home" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiHome className="mr-2" /> Home
          </Link>
          <Link to="/professordashboard" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiBook className="mr-2" /> Dashboard
          </Link>
          <Link to="/professor/create-class" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiPlusSquare className="mr-2" /> Create Class
          </Link>
          <Link to="/professor/classrooms" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiBook className="mr-2" /> Classrooms
          </Link>
          <Link to="/quizResultPage" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FaPuzzlePiece className="mr-2" /> QuizResults
          </Link>
          <Link to="/joincall" className="flex items-center hover:text-yellow-300 transition-colors duration-300">
            <FiVideo className="mr-2" /> Create Call
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

export default ProfessorHeader;
