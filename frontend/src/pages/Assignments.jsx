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

            // Update the assignment status to "Submitted" in the UI
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
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Assignments for Classroom ID: {classroomId}</h2>
            <p className="text-lg"><strong>Student ID:</strong> {studentId}</p>
            {loading ? (
                <p className="text-center">Loading assignments...</p>
            ) : (
                assignments.length > 0 ? (
                    <ul className="space-y-4">
                        {assignments.map((assignment) => (
                            <li key={assignment._id} className="border-b pb-4">
                                <h3 className="text-xl font-semibold">{assignment.title}</h3>
                                <p className="text-md"><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <p className="text-md"><strong>Grade:</strong> {assignment.grade || "Not graded"}</p>
                                <p className="text-md"><strong>Feedback:</strong> {assignment.feedback || "No feedback yet"}</p>
                                <p className="text-md">
                                    <strong>Status:</strong> {assignment.isSubmitted ? "Submitted" : "Unsubmitted"}
                                </p>
                                {console.log(assignment)}
                                {assignment.fileUrl && (
                                    <a
                                        href={assignment.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                                        download
                                    >
                                        Download Assignment
                                    </a>
                                )}
                                {/* Show submission button only if the assignment is unsubmitted */}
                                {!assignment.isSubmitted && (
                                    <div className="mt-4">
                                        <input type="file" onChange={handleFileChange} />
                                        <button
                                            onClick={() => handleFileSubmit(assignment._id)}
                                            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded"
                                        >
                                            Submit Assignment
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No assignments found for this classroom.</p>
                )
            )}
        </div>
    );
};

export default Assignments;
