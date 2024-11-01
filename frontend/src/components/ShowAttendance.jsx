import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendancePage = () => {
    const { joinCode } = useParams();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance/joinCode/${joinCode}`);
                setAttendanceRecords(response.data.attendance); // Assuming the API returns the data in this format
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch attendance data.");
            }
        };

        fetchAttendance();
    }, [joinCode]);

    return (
        <div>
            <h1>Attendance Records for Join Code: {joinCode}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {attendanceRecords.length > 0 ? (
                <ul>
                    {attendanceRecords.map((record) => (
                        <li key={record._id}>
                            <h3>Attendance Date: {record.date}</h3> {/* Assuming you have a date field */}
                            <ul>
                                {record.students.map((student) => (
                                    <li key={student.studentId}>
                                        <p>{student.name}: {student.present ? 'Present' : 'Absent'}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No attendance records found for this join code.</p>
            )}
        </div>
    );
};

export default AttendancePage;
