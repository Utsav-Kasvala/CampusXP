import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../context/AuthContext';

const ClassroomWiseAttendance = () => {
    const { user, studentId } = useContext(authContext); // Get the student ID from context
    const [attendanceData, setAttendanceData] = useState([]); // Store fetched attendance data
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/classroomwiseattendance`
                );
                setAttendanceData(response.data.classroomwiseattendance); // Update state with fetched data
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching attendance data:', error.response?.data?.message || error.message);
            } finally {
                setLoading(false); // Set loading state to false once data is fetched
            }
        };

        if (studentId) {
            fetchAttendance();
        }
    }, [studentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 mt-20">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600">Classroom-wise Attendance</h1>
                {attendanceData.length > 0 ? (
                    attendanceData.map((classroom, index) => (
                        <div key={index} className="my-4 p-4 bg-gray-50 rounded-md shadow">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {classroom.classname} ({classroom.joinCode})
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li>
                                    Date: {new Date(classroom.date).toLocaleDateString()} -{' '}
                                    <span className={classroom.present ? 'text-green-500' : 'text-red-500'}>
                                        {classroom.present ? 'Present' : 'Absent'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No attendance records found.</p>
                )}
            </div>
        </div>
    );
};

export default ClassroomWiseAttendance;
