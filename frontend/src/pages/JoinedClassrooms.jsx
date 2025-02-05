import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'; // Importing React Icons

const JoinedClassrooms = () => {
    const { studentId, user: { name: studentName } = {} } = useAuth();
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedClassrooms = async () => {
            if (!studentId) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/joined/${studentId}`);
                setClassrooms(res.data.classrooms);
            } catch (error) {
                console.error("Error fetching joined classrooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedClassrooms();
    }, [studentId]);

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl  bg-white mt-10 hover:shadow-lg transition-all transform hover:scale-105">

            {/* Title */}
            <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6 drop-shadow-lg">Joined Classrooms</h2>


            {/* Loading or Displaying Classrooms */}
            {loading ? (
                <p className="text-center text-xl text-blue-500">Loading classrooms...</p>
            ) : (
                classrooms.length > 0 ? (
                    <ul className="space-y-6">
                        {classrooms.map((classroom, index) => (
                            <li key={classroom._id} className=" pb-6">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all">
                                        <span className="font-bold">{index + 1}. </span>{classroom.subjectName}
                                    </span>
                                </div>
                                <div className="text-md text-gray-700 mt-2">
                                    <p className="flex items-center space-x-2">
                                        <FaBook className="text-blue-500" />
                                        <span><strong>Credits:</strong> {classroom.credits}</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <FaChalkboardTeacher className="text-blue-500" />
                                        <span><strong>Professor:</strong> {classroom.professorName}</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <FaUserGraduate className="text-blue-500" />
                                        <span><strong>Join Code:</strong> {classroom.joinCode}</span>
                                    </p>
                                </div>
                                <Link
                                    to={`/subject/${classroom._id}?studentId=${studentId}`}
                                    className="text-blue-600 hover:text-blue-800 font-semibold mt-2 inline-block"
                                >
                                    View Details
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-xl text-gray-600">No joined classrooms found.</p>
                )
            )}
        </div>
    );
};

export default JoinedClassrooms;
