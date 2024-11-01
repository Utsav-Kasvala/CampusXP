import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx';

const ProfessorHeader = () => {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 shadow-md p-4 flex justify-between items-center text-white">
      {/* Professor's Name */}
      <h1 className="text-lg font-semibold">{user?.name}</h1>

      {/* Navigation Links */}
      <nav className="space-x-4">
        <Link to="/home" className="hover:text-yellow-300 transition-colors duration-300">Home</Link>
        <Link to="/professor/dashboard" className="hover:text-yellow-300 transition-colors duration-300">Dashboard</Link>
        <Link to="/professor/create-class" className="hover:text-yellow-300 transition-colors duration-300">Create Class</Link>
        <Link to="/professor/classrooms" className="hover:text-yellow-300 transition-colors duration-300">Classrooms</Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 transition-colors duration-300 px-4 py-2 rounded-md font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default ProfessorHeader;
