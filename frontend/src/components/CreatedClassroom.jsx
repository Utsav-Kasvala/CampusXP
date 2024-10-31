import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

const CreatedClasses = () => {
    const { professorId } = useParams();
    const { user } = useContext(authContext); // Get user info from context
    const [classrooms, setClassrooms] = useState([]);
    const [error, setError] = useState(null);

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
