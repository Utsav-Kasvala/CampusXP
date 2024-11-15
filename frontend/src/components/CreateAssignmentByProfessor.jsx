import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

const CreateAssignment = () => {
    const { joinCode } = useParams();
    const { user } = useContext(authContext);
    const [classroom, setClassroom] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalPoints, setTotalPoints] = useState(100);
    const [file, setFile] = useState(null); // State for PDF file
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchClassroomDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join-code/${joinCode}`);
                setClassroom(response.data.classroom);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch classroom details.");
            }
        };

        fetchClassroomDetails();
    }, [joinCode]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the state with selected file
    };

    const handleAssignmentCreate = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate);
        formData.append('totalPoints', totalPoints);
        formData.append('professorId', user.professorId);
        formData.append('file', file); // Append the file to form data

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/classrooms/${joinCode}/assignment`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set content type for file upload
                    },
                }
            );

            setSuccessMessage(response.data.message);
            setError(null);
        } catch (err) {
            console.error("Failed to create assignment:", err);
            setError("Could not create assignment. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Assignment</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                {classroom ? (
                    <div>
                        <h2 className="text-lg font-medium mb-2">Classroom: {classroom.subjectName}</h2>
                        <p><strong>Credits:</strong> {classroom.credits}</p>
                        <p><strong>Professor:</strong> {user.name || "Not Available"}</p>
                        <p><strong>Join Code:</strong> {joinCode}</p>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Assignment Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border rounded w-full" />

                            <label className="block text-sm font-medium mt-4">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border rounded w-full" />

                            <label className="block text-sm font-medium mt-4">Due Date</label>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 p-2 border rounded w-full" />

                            <label className="block text-sm font-medium mt-4">Total Points</label>
                            <input type="number" value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)} className="mt-1 p-2 border rounded w-full" />

                            <label className="block text-sm font-medium mt-4">Upload Assignment PDF</label>
                            <input type="file" accept=".pdf" onChange={handleFileChange} className="mt-1 p-2 border rounded w-full" />

                            <button onClick={handleAssignmentCreate} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
                                Create Assignment
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading classroom details...</p>
                )}
            </div>
        </div>
    );
};

export default CreateAssignment;
