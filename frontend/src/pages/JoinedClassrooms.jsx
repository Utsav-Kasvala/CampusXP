// src/pages/JoinedClassrooms.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const JoinedClassrooms = ({ studentName }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedClassrooms = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/classrooms/joined/${studentName}`);
                setClassrooms(res.data);
            } catch (error) {
                console.error("Error fetching joined classrooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedClassrooms();
    }, [studentName]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Joined Classrooms</h2>
            {classrooms.length ? (
                <ul>
                    {classrooms.map((classroom) => (
                        <li key={classroom._id}>
                            {classroom.subjectName} - Professor {classroom.professorName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classrooms joined yet.</p>
            )}
        </div>
    );
};

export default JoinedClassrooms;
