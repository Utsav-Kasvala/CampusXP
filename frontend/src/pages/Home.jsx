import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-20">
            <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to CampusXP</h1>
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Home</h2>
                <p className="text-gray-700 mb-4">Manage your timetable and stay organized!</p>
                <p className="mb-4">
                    Don&apos;t have an Account?{' '}
                    <Link to='/Register' className="text-blue-500 hover:underline">Register</Link>
                </p>
                <p>
                    Already have an Account?{' '}
                    <Link to='/Login' className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
