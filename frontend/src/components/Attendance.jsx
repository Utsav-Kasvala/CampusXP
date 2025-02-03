import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// StarField Component (Reused from CreateClass)
const StarField = () => {
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        speeds[i] = Math.random() * 0.002 + 0.0005;
    }

    const pointsRef = useRef();
    useFrame(() => {
        if (pointsRef.current) {
            for (let i = 0; i < numStars; i++) {
                positions[i * 3 + 2] += speeds[i];
                if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} frustumCulled={false}>
            <PointMaterial size={0.05} color="#ffffff" sizeAttenuation />
        </Points>
    );
};

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
            alert(response.data.message);
            navigate('/professor/classrooms');
        } catch (err) {
            setError("Failed to update attendance. Please try again.");
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            {/* StarField Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Attendance Content */}
            <div className="relative z-10 w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Take Attendance for Session</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {attendance ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Date: {new Date(attendance.date).toLocaleDateString()}
                        </h2>
                        <ul className="space-y-4">
                            {attendance.students.map(student => (
                                <li
                                    key={student.studentId}
                                    className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <span className="font-medium text-gray-700">{student.name}</span>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleAttendanceToggle(student.studentId)}
                                            className={`relative w-16 h-8  rounded-full p-1 transition-colors duration-300 ${
                                                student.present ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        >
                                            <div
                                                className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                                    student.present ? 'translate-x-8' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                        <span
                                            className={`font-semibold ${
                                                student.present ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                                            {student.present ? 'Present' : 'Absent'}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500 text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AttendancePage;