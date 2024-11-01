import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext.jsx';

const StudentDashboard = () => {
    const { user, studentId } = useContext(authContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Student Dashboard</h1>
                    <div>
                        {user?.name ? (
                            <span className="text-gray-700 text-lg">
                                Welcome, {user.name}! Your ID is <strong>{studentId}</strong>
                            </span>
                        ) : (
                            <span className="text-red-500 text-lg">Please log in.</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional content for the Student Dashboard can go here */}
            <div className="w-full max-w-3xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Courses and Activities</h2>
                <div className="p-4 bg-white shadow-md rounded-md">
                    {/* Placeholder for future dashboard content */}
                    <p className="text-gray-600">You have no activities to display at the moment.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
