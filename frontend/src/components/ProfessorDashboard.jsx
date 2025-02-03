import React, { useContext, Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { authContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaBook, FaClipboardList, FaUsers } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

// Starfield Animation
const StarField = () => {
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20; // X position
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y position
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z position (depth)
        speeds[i] = Math.random() * 0.002 + 0.0005; // Different twinkle speeds
    }

    const pointsRef = useRef();
    useFrame(() => {
        if (pointsRef.current) {
            for (let i = 0; i < numStars; i++) {
                positions[i * 3 + 2] += speeds[i]; // Move stars forward
                if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10; // Reset star depth
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

const ProfessorDashboard = () => {
    const { user } = useContext(authContext);

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-indigo-900 to-blue-700 flex flex-col items-center p-6 mt-16">
            {/* 3D Star Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <StarField />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Section */}
            <div className="relative z-10 w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-80">
                <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">Professor Dashboard</h1>

                {/* Professor Info */}
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-xl mb-10">
                    <div>
                        <p className="text-2xl font-semibold">Welcome, {user?.name}!</p>
                        <p className="text-lg"><strong>Professor ID:</strong> {user?.professorId}</p>
                    </div>
                    <FaChalkboardTeacher className="text-6xl transform scale-110" />
                </div>

                {/* Quick Stats Section */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center justify-between border-l-4 border-blue-500 hover:scale-105 transition transform">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Classes</h3>
                            <p className="text-2xl font-bold text-blue-600">5</p>
                        </div>
                        <FaBook className="text-blue-500 text-5xl" />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center justify-between border-l-4 border-green-500 hover:scale-105 transition transform">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Quizzes</h3>
                            <p className="text-2xl font-bold text-green-600">2 Active</p>
                        </div>
                        <FaClipboardList className="text-green-500 text-5xl" />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center justify-between border-l-4 border-purple-500 hover:scale-105 transition transform">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Students Enrolled</h3>
                            <p className="text-2xl font-bold text-purple-600">120+</p>
                        </div>
                        <FaUsers className="text-purple-500 text-5xl" />
                    </div>
                </div>

                {/* Dashboard Actions */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                    <Link to="/create-class" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold p-6 rounded-2xl shadow-2xl flex items-center justify-center transition transform hover:scale-105">
                        <IoMdAddCircle className="text-2xl mr-3" /> Create Class
                    </Link>
                    <Link to="/quiz-management" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold p-6 rounded-2xl shadow-2xl flex items-center justify-center transition transform hover:scale-105">
                        📜 Manage Quizzes
                    </Link>
                    <Link to="/assignments" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-semibold p-6 rounded-2xl shadow-2xl flex items-center justify-center transition transform hover:scale-105">
                        ✅ Assignments
                    </Link>
                    <Link to="/students" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-semibold p-6 rounded-2xl shadow-2xl flex items-center justify-center transition transform hover:scale-105">
                        👨‍🎓 View Students
                    </Link>
                </div>

                {/* Recent Activities Section */}
                <div className="bg-white p-6 rounded-2xl shadow-2xl">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-5">Recent Activities</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between text-gray-600 hover:text-blue-500 transition duration-300">
                            <span>✔ Created "Data Structures" Class</span>
                            <span className="text-sm text-gray-400">2 days ago</span>
                        </li>
                        <li className="flex justify-between text-gray-600 hover:text-blue-500 transition duration-300">
                            <span>📜 Added Quiz on "Algorithms"</span>
                            <span className="text-sm text-gray-400">3 days ago</span>
                        </li>
                        <li className="flex justify-between text-gray-600 hover:text-blue-500 transition duration-300">
                            <span>✅ Reviewed 5 Assignments</span>
                            <span className="text-sm text-gray-400">5 days ago</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfessorDashboard;
