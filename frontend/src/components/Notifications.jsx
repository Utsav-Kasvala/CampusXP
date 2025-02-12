import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaSpinner } from 'react-icons/fa'; // Importing icons

const Notifications = () => {
    const { studentId } = useAuth();
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJoinedClassrooms = async () => {
            if (!studentId) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/joined/${studentId}`);
                setClassrooms(res.data.classrooms);
            } catch (error) {
                console.error("Error fetching joined classrooms:", error);
                setError("Failed to load classrooms. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedClassrooms();
    }, [studentId]);

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-blue-100 mt-10 hover:shadow-lg transition-all transform hover:scale-105">
            {/* Title
            <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6 drop-shadow-lg">
                Classroom Notifications
            </h2> */}

            {/* Loading or Displaying Classrooms */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-violet-500 text-3xl" />
                    <p className="ml-3 text-xl text-violet-500">Loading classrooms...</p>
                </div>
            ) : error ? (
                <p className="text-center text-xl text-red-500">{error}</p>
            ) : (
                classrooms.length > 0 ? (
                    <ul className="space-y-6">
                        {classrooms.map((classroom, index) => (
                            <li key={classroom._id} className="pb-6">
                                {/* Subject Title */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl font-extrabold text-cyan-600 hover:text-violet-800 transition-all">
                                        <span className="font-bold">{index + 1}. </span>{classroom.subjectName}
                                    </span>
                                </div>

                                {/* Display Latest 3 Notifications */}
                                <div className="mt-4">
                                    <h3 className="text-lg font-extrabold text-cyan-900">Latest Notifications:</h3>
                                    <ul className="space-y-4">
                                        {classroom.notifications && classroom.notifications.length > 0 ? (
                                            // Sort by timestamp (latest first) and take only top 3
                                            classroom.notifications
                                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                                .slice(0, 3)
                                                .map((notification, idx) => (
                                                    <li key={idx} className="flex items-center space-x-2 text-violet-700 border-b-2 border-red-300 pb-2">
                                                        <FaBell className="text-red-500" />
                                                        <div className="flex-1 ">
                                                            <p>{notification.message}</p>
                                                            <span className="text-xs text-cyan-700">
                                                                {new Date(notification.timestamp).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))
                                        ) : (
                                            <li className="text-violet-600">No notifications yet.</li>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-xl text-gray-600">No classrooms found.</p>
                )
            )}
        </div>
    );
};

export default Notifications;
