import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendancePage = () => {
    const { attendanceId } = useParams();
    const [attendance, setAttendance] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance/${attendanceId}`);
                setAttendance(response.data);
            } catch (err) {
                setError("Failed to fetch attendance record.");
                toast.error("❌ Failed to fetch attendance!");
            }
        };

        fetchAttendance();
    }, [attendanceId]);

    const handleAttendanceToggle = (studentId) => {
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            students: prevAttendance.students.map(student =>
                student.studentId === studentId ? { ...student, present: !student.present } : student
            ),
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/attendance/update/${attendanceId}`,
                { students: attendance.students }
            );
            toast.success("Attendance updated successfully!");
            setTimeout(() => navigate('/professor/classrooms'), 1500);
        } catch (err) {
            toast.error("❌ Failed to update attendance. Try again!");
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-blue-100 p-6">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
            <div className="relative z-10 w-full max-w-3xl bg-white bg-opacity-20 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/20">
                <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
                    📋 Attendance for Session
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {attendance ? (
                    <>
                        <h2 className="text-lg text-white font-semibold mb-6 text-center">
                            📅 Date: {new Date(attendance.date).toLocaleDateString()}
                        </h2>
                        <ul className="space-y-4">
                            {attendance.students.map(student => (
                                <li
                                    key={student.studentId}
                                    className="flex justify-between items-center p-4 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-md hover:scale-105 transition-transform"
                                >
                                    <span className="font-medium text-white text-lg">{student.name}</span>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleAttendanceToggle(student.studentId)}
                                            className={`relative w-16 h-8 rounded-full transition-all duration-300 border-2 border-white shadow-md
                                                ${student.present ? 'bg-green-400' : 'bg-red-400'}`}
                                        >
                                            <div
                                                className={`absolute w-7 h-7 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                                                    student.present ? 'translate-x-8' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                        <span
                                            className={`text-lg font-semibold ${
                                                student.present ? 'text-green-300' : 'text-red-300'
                                            }`}
                                        >
                                            {student.present ? '✔ Present' : '❌ Absent'}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-xl hover:bg-blue-600 transition-all"
                        >
                            ✅ Submit Attendance
                        </button>
                    </>
                ) : (
                    <p className="text-white text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AttendancePage;
