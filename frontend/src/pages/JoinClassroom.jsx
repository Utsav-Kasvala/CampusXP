import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JoinClassroom = () => {
    // State for classroom code input and join status message
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user, studentId } = useAuth(); // Access user and studentId from context

    // Function to handle the classroom join process
    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            // Send join request to the server with classroom code, student ID, and name
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join`, {
                code,
                studentId: studentId, // Use the studentId from context
                studentName: user?.name,
            });

            setMessage('Joined classroom successfully!'); // Success message

            // Refresh the current page ("/allclassrooms")
            navigate(0);  // This will reload the current page

        } catch (error) {
            // Error handling for various cases
            console.log(error);
            if (error.response && error.response.status === 404) {
                setMessage('Invalid code. Please check and try again.');
            } else {
                setMessage('Error joining classroom. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-40">
            <h2 className="text-2xl font-bold mb-4 text-center">Join Classroom</h2>
            {/* Display the student's name */}
            <p className="text-lg mb-4 text-center">Student Name: {user?.name}</p>
            <form onSubmit={handleJoin} className="flex flex-col">
                <input 
                    type="text" 
                    placeholder="Enter Classroom Code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                    className="border border-gray-300 rounded p-2 mb-4"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Join
                </button>
            </form>
            {/* Display any message (success or error) */}
            {message && <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </div>
    );
};

export default JoinClassroom;
