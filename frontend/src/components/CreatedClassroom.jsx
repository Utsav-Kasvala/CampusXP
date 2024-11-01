import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

const CreatedClasses = () => {
    const { professorId } = useParams();
    const { user } = useContext(authContext);
    const [classrooms, setClassrooms] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/professor/${user.professorId}/classes`);
                setClassrooms(response.data.classrooms);
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.message || "Failed to fetch classrooms");
            }
        };

        fetchClassrooms();
    }, [user.professorId]);

    // Redirect to AttendancePage with joinCode as parameter
    const handleTakeAttendance = async (joinCode) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/attendance/create/${joinCode}`);
            const attendanceId = response.data.attendanceId;

            // Redirect to the attendance page with the new attendance ID and joinCode
            navigate(`/professor/attendance/${joinCode}/${attendanceId}`);
        } catch (error) {
            console.error("Failed to create attendance:", error);
            setError("Could not create attendance. Please try again.");
        }
    };

    return (
        <div>
            <h1>Created Classes</h1>
            <h2>Professor ID: {user.professorId || professorId}</h2>
            <h2>Professor Name: {user.name || "Not Available"}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {classrooms.length > 0 ? (
                <ul>
                    {classrooms.map(classroom => (
                        <li key={classroom._id}>
                            <Link to={`/professor/subject/${classroom.subjectName}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                <h3>{classroom.subjectName}</h3>
                            </Link>
                            <p><strong>Credits:</strong> {classroom.credits}</p>
                            <p><strong>Professor:</strong> {user.name || "Not Available"}</p>
                            <p><strong>Join Code:</strong> {classroom.joinCode}</p>
                            <button onClick={() => handleTakeAttendance(classroom.joinCode)} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}>
                                Take Attendance
                            </button>
                            <Link to={`/professor/attendance/${classroom.joinCode}`}>
                                <button style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                                    Show Attendance
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classes created yet.</p>
            )}
        </div>
    );
};

export default CreatedClasses;
