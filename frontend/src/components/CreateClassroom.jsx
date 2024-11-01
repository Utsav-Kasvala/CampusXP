import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../context/AuthContext';

const CreateClass = () => {
    const { user } = useContext(authContext);
    const [subjectName, setSubjectName] = useState('');
    const [credits, setCredits] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateClassroom = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/create`, {
                subjectName,
                credits,
                professorId: user.professorId,
                professorName: user.name,
            });

            setJoinCode(response.data.joinCode);
            setMessage(`Classroom created successfully! Join code: ${response.data.joinCode}`);
            setSubjectName('');
            setCredits('');
        } catch (error) {
            setMessage("Error creating classroom: " + (error.response?.data?.message || "Please try again later."));
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Class</h1>

                <div className="mb-4 text-center">
                    <p><strong>Welcome,</strong> {user?.name}!</p>
                    <p><strong>Professor ID:</strong> {user?.professorId}</p>
                </div>

                <form onSubmit={handleCreateClassroom} className="space-y-4">
                    <div>
                        <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                            Subject Name:
                        </label>
                        <input
                            type="text"
                            id="subjectName"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                            Credits:
                        </label>
                        <input
                            type="number"
                            id="credits"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Class
                    </button>
                </form>

                {joinCode && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg shadow-md text-center">
                        <h3 className="font-semibold">Joining Code:</h3>
                        <p className="text-lg font-mono">{joinCode}</p>
                    </div>
                )}

                {message && (
                    <div className={`mt-6 p-4 rounded-lg shadow-md text-center ${
                        message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateClass;
