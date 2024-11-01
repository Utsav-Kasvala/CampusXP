import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const NavigationBar = () => {
    const { user, dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <header className="bg-blue-500 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-white text-xl font-bold">{user.name}</h1>
                <nav className="flex space-x-4">
                    <Link to="/home" className="text-white hover:text-blue-200">Home</Link>
                    <Link to="/join-classroom" className="text-white hover:text-blue-200">Join Classroom</Link>
                    <Link to="/leaderboard" className="text-white hover:text-blue-200">Leaderboard</Link>
                    <Link to="/joined-classrooms" className="text-white hover:text-blue-200">Joined Classrooms</Link>
                    <Link to="/timeTable" className="text-white hover:text-blue-200">TimeTable</Link>
                </nav>
                <button 
                    onClick={handleLogout} 
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default NavigationBar;
