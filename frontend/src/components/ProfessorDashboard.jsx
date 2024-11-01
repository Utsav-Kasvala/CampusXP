import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';

const ProfessorDashboard = () => {
    const { user } = useContext(authContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Professor Dashboard</h1>

                {/* Professor Info Section */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6 shadow-inner">
                    <p className="text-xl font-medium text-gray-800">Welcome, {user?.name}!</p>
                    <p className="text-gray-600"><strong>Professor ID:</strong> {user?.professorId}</p>
                </div>

                {/* Dashboard Content */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Classes and Activities</h3>
                    <p className="text-gray-500">Manage your classes, track attendance, and access assignment activities.</p>
                    {/* Add additional sections or dashboard features as needed */}
                </div>
            </div>
        </div>
    );
};

export default ProfessorDashboard;
