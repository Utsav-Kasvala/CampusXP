import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendancePage = () => {
    const { attendanceId } = useParams();
    const [attendance, setAttendance] = useState(null);
    const [error, setError] = useState(null);

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

    // Handle attendance toggle for each student
    const handleAttendanceChange = (studentId, isPresent) => {
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            students: prevAttendance.students.map(student =>
                student.studentId === studentId ? { ...student, present: isPresent } : student
            ),
        }));
    };

    // Submit updated attendance
    const handleSubmit = async () => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/attendance/update/${attendanceId}`,
                { students: attendance.students }
            );
            alert(response.data.message);
        } catch (err) {
            setError("Failed to update attendance. Please try again.");
        }
    };

    return (
        <div>
            <h1>Take Attendance for Session</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {attendance ? (
                <div>
                    <h2>Date: {new Date(attendance.date).toLocaleDateString()}</h2>
                    <ul>
                        {attendance.students.map(student => (
                            <li key={student.studentId}>
                                <span>{student.name}</span>
                                <button onClick={() => handleAttendanceChange(student.studentId, true)}>
                                    Present
                                </button>
                                <button onClick={() => handleAttendanceChange(student.studentId, false)}>
                                    Absent
                                </button>
                                <span>{student.present ? 'Present' : 'Absent'}</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Submit
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AttendancePage;
