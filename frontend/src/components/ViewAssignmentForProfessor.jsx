import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewAssignments = () => {
    const { joinCode } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

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

    const navigate = useNavigate();
    
    const handleEvaluate = (assignmentId) => {
        navigate(`/assignments/${assignmentId}/evaluate`);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Assignments for Join Code: {joinCode}</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {assignments.length > 0 ? (
                    <ul className="space-y-4">
                        {assignments.map(assignment => (
                            <li key={assignment._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                <p><strong>Description:</strong> {assignment.description}</p>
                                <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <p><strong>Submissions:</strong> {assignment.submissionCount}</p>
                                
                                <button
                                    onClick={() => handleEvaluate(assignment._id)}
                                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Evaluate
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No assignments found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAssignments;
