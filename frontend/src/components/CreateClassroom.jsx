import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../context/AuthContext';

const CreateClass = () => {
    const { user } = useContext(authContext); // Access user object from auth context
    const [subjectName, setSubjectName] = useState('');
    const [credits, setCredits] = useState('');
    const [joinCode, setJoinCode] = useState(''); // State to hold the joining code
    const [message, setMessage] = useState(''); // State to hold success/error messages

    const handleCreateClassroom = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/create`, {
                subjectName,
                credits,
                professorId: user.professorId, // Use professorId from context
                professorName: user.name, // Use professor's name from context
            });

            setJoinCode(response.data.joinCode); // Set the joining code received from the server
            setMessage(`Classroom created successfully! Join code: ${response.data.joinCode}`);
            setSubjectName(''); // Clear subjectName
            setCredits(''); // Clear credits
        } catch (error) {
            setMessage("Error creating classroom: " + (error.response?.data?.message || "Please try again later."));
        }
    };

    return (
        <div>
            <h1>Create Class</h1>
            {/* Display professor's name and ID */}
            <div className="professor-info">
                <p><strong>Welcome,</strong> {user?.name}!</p>
                <p><strong>Professor ID:</strong> {user?.professorId}</p>
            </div>

            <form onSubmit={handleCreateClassroom}>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="credits">Credits:</label>
                    <input
                        type="number"
                        id="credits"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Class</button>
            </form>

            {/* Display the joining code if available */}
            {joinCode && (
                <div className="joining-code">
                    <h3>Joining Code:</h3>
                    <p>{joinCode}</p>
                </div>
            )}

            {/* Display success or error message if there is any */}
            {message && (
                <div className="message">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default CreateClass;
