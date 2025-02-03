import React, { useContext, useState, useRef, Suspense } from 'react';
import axios from 'axios';
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { authContext } from '../context/AuthContext';
import { FaChalkboard, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const StarField = () => {
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        speeds[i] = Math.random() * 0.002 + 0.0005;
    }

    const pointsRef = useRef();
    useFrame(() => {
        if (pointsRef.current) {
            for (let i = 0; i < numStars; i++) {
                positions[i * 3 + 2] += speeds[i];
                if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} frustumCulled={false}>
            <PointMaterial size={0.05} color="#ffffff" sizeAttenuation />
        </Points>
    );
};

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
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <StarField />
                    </Suspense>
                </Canvas>
            </div>
            <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
                <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6 flex items-center justify-center gap-2">
                    <FaChalkboard className="text-blue-600" /> Create Class
                </h1>
                <form onSubmit={handleCreateClassroom} className="space-y-5">
                    <div>
                        <label htmlFor="subjectName" className="block text-sm font-semibold text-gray-700">Subject Name</label>
                        <input type="text" id="subjectName" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="credits" className="block text-sm font-semibold text-gray-700">Credits</label>
                        <input type="number" id="credits" value={credits} onChange={(e) => setCredits(e.target.value)} required
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <button type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        Create Class
                    </button>
                </form>
                {joinCode && (
                    <div className="mt-6 p-5 bg-green-100 text-green-700 rounded-lg shadow-md text-center flex flex-col items-center">
                        <FaCheckCircle className="text-3xl mb-2" />
                        <h3 className="font-semibold text-lg">Classroom Created Successfully!</h3>
                        <p className="text-lg font-mono mt-2">Join Code: <span className="font-bold text-green-900">{joinCode}</span></p>
                    </div>
                )}
                {message && (
                    <div className={`mt-6 p-5 rounded-lg shadow-md text-center flex flex-col items-center ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {message.includes("Error") ? <FaExclamationCircle className="text-3xl mb-2" /> : <FaCheckCircle className="text-3xl mb-2" />}
                        <p className="font-semibold">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateClass;