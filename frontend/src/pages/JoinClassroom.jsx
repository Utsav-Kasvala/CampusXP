import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JoinClassroom = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user, studentId } = useAuth(); // Access user and studentId from context

    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join`, {
                code,
                studentId: studentId, 
                studentName: user?.name,
            });

            setMessage('Joined classroom successfully!'); 
            navigate(0);  // Refresh the current page

        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
                setMessage('Invalid code. Please check and try again.');
            } else {
                setMessage('Error joining classroom. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded-3xl  bg-white shadow-xl backdrop-blur-lg bg-opacity-60 mt-10 hover:shadow-lg transition-all transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-6 text-yellow-200 text-center drop-shadow-lg">Join Classroom</h2>
            <p className="text-lg mb-6 text-yellow-200 text-center">Student Name: {user?.name}</p>
            <form onSubmit={handleJoin} className="flex flex-col bg-white p-6 rounded-xl shadow-lg space-y-4">
                <input 
                    type="text" 
                    placeholder="Enter Classroom Code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                    className="border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                    Join
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'} text-lg font-medium`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default JoinClassroom;
