import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarField from './StarField';
import { FaFileAlt, FaCalendarAlt, FaUsers, FaClipboardCheck } from 'react-icons/fa';

const ViewAssignments = () => {
    const { joinCode } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/viewAssignment/${joinCode}`);
                setAssignments(response.data.assignments);
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.message || "Failed to fetch assignments");
            }
        };
        fetchAssignments();
    }, [joinCode]);

    const handleEvaluate = (assignmentId) => {
        navigate(`/assignments/${assignmentId}/evaluate`);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center p-6 mt-20 overflow-hidden bg-gradient-to-r from-purple-900 to-blue-100">
            <div className="relative z-10 w-full max-w-4xl bg-blue-100 shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-90 m-24">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">📚 Assignments</h1>
                
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                {assignments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {assignments.map(assignment => (
                            <div key={assignment._id} className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white transform hover:scale-105 transition duration-300">
                                <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
                                    <FaFileAlt /> {assignment.title}
                                </h3>
                                <p className="text-gray-700 mt-2"><strong><FaClipboardCheck className="inline text-green-600" /> Description:</strong> {assignment.description}</p>
                                <p className="text-gray-700 mt-2"><strong><FaCalendarAlt className="inline text-red-500" /> Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <p className="text-gray-700 mt-2"><strong><FaUsers className="inline text-purple-600" /> Submissions:</strong> {assignment.submissionCount}</p>
                                
                                <button
                                    onClick={() => handleEvaluate(assignment._id)}
                                    className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300 w-full"
                                >
                                    Evaluate 📝
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No assignments found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAssignments;
