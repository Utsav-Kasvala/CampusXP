import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import StudentHeader from './StudentHeader.jsx';
import ProfessorHeader from './ProfessorHeader.jsx';

export const Header = () => {
  const { user } = useContext(authContext);

  let temp = (
    <nav className="flex space-x-6">
      <Link to="/home" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
      <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
      <Link to="/register" className="text-gray-700 hover:text-green-600 font-medium">Register</Link>
    </nav>
  );

  if (user?.studentId) {
    temp = <StudentHeader />;
  }
  
  if (user?.professorId) {
    temp = <ProfessorHeader />;
  }

  return (
    <header className="bg-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-[1050px] mx-auto flex justify-between items-center p-4">
        <h1 className="text-white text-xl font-bold">Campus College Tracker</h1>
        {temp}
      </div>
    </header>
  );
};

export default Header;
