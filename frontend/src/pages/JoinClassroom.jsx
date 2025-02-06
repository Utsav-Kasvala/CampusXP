import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JoinClassroom = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user, studentId } = useAuth();

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join`, {
                code,
                studentId: studentId,
                studentName: user?.name,
            });

            // If joining is successful, show success message
            setMessage('Joined classroom successfully!');
            navigate(0);  // Refresh the page

        } catch (error) {
            // Handle error scenarios
            if (error.response?.status === 400) {
                setMessage('You have already joined this classroom.');
            } else if (error.response?.status === 404) {
                setMessage('Invalid code. Please check and try again.');
            } else {
                setMessage('Error joining classroom. Please try again later.');
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold text-center mb-2">Join Classroom</h2>
            <form onSubmit={handleJoin} className="flex flex-col space-y-2">
                <input 
                    type="text" 
                    placeholder="Classroom Code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                    className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600 transition-all"
                >
                    Join
                </button>
            </form>
            {message && (
                <p className={`mt-2 text-center text-sm font-medium ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default JoinClassroom;
