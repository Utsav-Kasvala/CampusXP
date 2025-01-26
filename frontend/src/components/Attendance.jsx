import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

    const handleAttendanceChange = (studentId, isPresent) => {
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            students: prevAttendance.students.map(student =>
                student.studentId === studentId ? { ...student, present: isPresent } : student
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
    
          // Navigate to the desired route after successful update
          navigate('/professor/classrooms');
        } catch (err) {
          setError("Failed to update attendance. Please try again.");
        }
      };
    

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
            <h1 className="text-2xl font-bold mb-4">Take Attendance for Session</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {attendance ? (
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Date: {new Date(attendance.date).toLocaleDateString()}
                    </h2>
                    <ul className="space-y-4">
                        {attendance.students.map(student => (
                            <li
                                key={student.studentId}
                                className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg"
                            >
                                <span className="font-medium">{student.name}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleAttendanceChange(student.studentId, true)}
                                        className={`px-4 py-2 rounded ${
                                            student.present ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                                        } hover:bg-green-600`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() => handleAttendanceChange(student.studentId, false)}
                                        className={`px-4 py-2 rounded ${
                                            !student.present ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                                        } hover:bg-red-600`}
                                    >
                                        Absent
                                    </button>
                                </div>
                                <span
                                    className={`font-semibold ${
                                        student.present ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {student.present ? 'Present' : 'Absent'}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default AttendancePage;
