import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation

const JoinedClassrooms = () => {
    const { studentId, user: { name: studentName } = {} } = useAuth();
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedClassrooms = async () => {
            if (!studentId) return;  // Guard against undefined studentId
            try {
                const res = await axios.get(`${BASE_URL}/classrooms/joined/${studentId}`);
                setClassrooms(res.data.classrooms); // Assuming the data structure includes a `classrooms` field
            } catch (error) {
                console.error("Error fetching joined classrooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedClassrooms();
    }, [studentId]);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Joined Classrooms</h2>
            <p className="text-lg mb-2"><strong>Student Name:</strong> {studentName}</p>
            <p className="text-lg mb-4"><strong>Student ID:</strong> {studentId}</p>
            {loading ? (
                <p className="text-center">Loading classrooms...</p>
            ) : (
                classrooms.length > 0 ? (
                    <ul className="space-y-4">
                        {classrooms.map(classroom => (
                            <li key={classroom._id} className="border-b pb-4">
                                <Link to={`/subject/${classroom.subjectName}`} className="text-blue-600 hover:underline">
                                    <h3 className="text-xl font-semibold">{classroom.subjectName}</h3>
                                </Link>
                                <p className="text-md"><strong>Credits:</strong> {classroom.credits}</p>
                                <p className="text-md"><strong>Professor:</strong> {classroom.professorName}</p>
                                <p className="text-md"><strong>Join Code:</strong> {classroom.joinCode}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No joined classrooms found.</p>
                )
            )}
        </div>
    );
};

export default JoinedClassrooms;
