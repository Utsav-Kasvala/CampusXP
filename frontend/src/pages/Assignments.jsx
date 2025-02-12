import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useParams, useLocation } from 'react-router-dom';

const Assignments = () => {
    const { classroomId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const location = useLocation();
    const studentId = new URLSearchParams(location.search).get('studentId');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/assignments/student/${studentId}`, {
                    params: { classroomId }
                });
                setAssignments(res.data.assignments);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [classroomId, studentId]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileSubmit = async (assignmentId) => {
        if (!file) return alert("Please select a file before submitting.");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);

        try {
            await axios.post(`${BASE_URL}/assignments/${assignmentId}/submit`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("File submitted successfully!");

            // Update the assignment status in UI
            setAssignments((prevAssignments) =>
                prevAssignments.map((assignment) =>
                    assignment._id === assignmentId ? { ...assignment, isSubmitted: true } : assignment
                )
            );
        } catch (error) {
            console.error("Error submitting assignment:", error);
            alert("Failed to submit the assignment.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-200 to-blue-600 flex flex-col items-center p-6 mt-16">
        <div className="max-w-3xl mx-auto p-6 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg mt-10 mb-12">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
            ___________📚 Assignments To be Done_____________
            </h2>
            {/* <p className="text-lg text-gray-600 text-center mb-4">
                <strong className="text-blue-600">Student ID:</strong> {studentId}
            </p> */}
            {loading ? (
                <p className="text-center text-gray-500">Loading assignments...</p>
            ) : (
                assignments.length > 0 ? (
                    <ul className="space-y-6">
                        {assignments.map((assignment) => (
                            <li key={assignment._id} className="p-5 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
                                <p className="text-md text-gray-600"><strong>📅 Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <p className="text-md text-gray-600"><strong>🏅 Grade:</strong> {assignment.grade || "Not graded"}</p>
                                <p className="text-md text-gray-600"><strong>💬 Feedback:</strong> {assignment.feedback || "No feedback yet"}</p>
                                <p className="text-md font-medium">
                                    <strong>📌 Status:</strong> 
                                    <span className={`ml-2 px-3 py-1 text-white text-sm rounded-full ${assignment.isSubmitted ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {assignment.isSubmitted ? "Submitted" : "Unsubmitted"}
                                    </span>
                                </p>
                                {assignment.fileUrl && (
                                    <a
                                        href={assignment.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-block text-blue-700 font-semibold hover:underline"
                                        download
                                    >
                                        ⬇️ Download Assignment
                                    </a>
                                )}
                                {!assignment.isSubmitted && (
                                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                                        <input type="file" onChange={handleFileChange} className="border rounded px-3 py-2" />
                                        <button
                                            onClick={() => handleFileSubmit(assignment._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg transition"
                                        >
                                            🚀 Submit Assignment
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No assignments found for this classroom.</p>
                )
            )}
        </div>
        </div>
    );
};

export default Assignments;
