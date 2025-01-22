import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importing Font Awesome icons
import StudentHeader from './StudentHeader.jsx';
import ProfessorHeader from './ProfessorHeader.jsx';

export const Header = () => {
  const { user } = useContext(authContext);

  let navLinks = (
    <nav className="flex space-x-8 text-gray-300 text-lg font-medium"> {/* Increased font size */}
      <Link to="/home" className="flex items-center hover:text-yellow-200 transition duration-300">
        <FaHome className="mr-1" /> Home
      </Link>
      <Link to="/login" className="flex items-center hover:text-yellow-200 transition duration-300">
        <FaSignInAlt className="mr-1" /> Login
      </Link>
      <Link to="/register" className="flex items-center hover:text-yellow-200 transition duration-300">
        <FaUserPlus className="mr-1" /> Register
      </Link>
    </nav>
  );

  if (user?.studentId) {
    navLinks = <StudentHeader />;
  } else if (user?.professorId) {
    navLinks = <ProfessorHeader />;
  }

  return (
    <header className="bg-gradient-to-r from-purple-900 to-blue-400  shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <Link to="/home" className="text-white text-2xl font-semibold tracking-wide hover:text-yellow-200 transition duration-300"> {/* Increased font size */}
            CampusXP
          </Link>
        </div>
        {navLinks}
      </div>
    </header>
  );
};

export default Header;
