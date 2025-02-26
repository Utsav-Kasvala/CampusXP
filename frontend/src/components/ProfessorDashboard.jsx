import React, { useContext, useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { authContext } from "../context/AuthContext";
import { MdClass, MdPeople, MdAssignment, MdSend } from "react-icons/md"; 
import { TbChalkboard } from "react-icons/tb"; 
import { FaRegBell } from "react-icons/fa"; 

// Starfield Animation
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

const ProfessorDashboard = () => {
    const { user } = useContext(authContext);
    const [classrooms, setClassrooms] = useState([]);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/classrooms/dashboard/${user.professorId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log("Fetched Classrooms:", data);

                if (Array.isArray(data.classrooms)) {
                    setClassrooms(data.classrooms);
                } else {
                    setClassrooms([]);
                }
            } catch (error) {
                console.error("Error fetching classrooms:", error);
                setClassrooms([]);
            }
        };

        if (user?.professorId) fetchClassrooms();
    }, [user]);

    const handleNotificationChange = (classroomId, event) => {
        setNotifications((prev) => ({
            ...prev,
            [classroomId]: event.target.value,
        }));
    };

    const handleNotificationSubmit = async (classroomId) => {
        const message = notifications[classroomId] || "";
    
        if (!message.trim()) {
            alert("Notification message cannot be empty!");
            return;
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/classrooms/postnotification/${classroomId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to send notification");
            }
    
            alert("Notification sent successfully!");
    
            // Clear the input field after sending the notification
            setNotifications((prev) => ({
                ...prev,
                [classroomId]: "",
            }));
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Failed to send notification. Please try again.");
        }
    };
    

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-teal-900 to-purple-800 flex flex-col items-center p-6 mt-16">
            {/* Starfield Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <StarField />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 backdrop-blur-md bg-opacity-95 mt-9">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-6 text-center flex items-center justify-center gap-3">
                    <TbChalkboard className="text-purple-600" /> Professor Dashboard
                </h1>

                {/* Professor Info */}
                <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-8 text-center">
                    <p className="text-2xl font-semibold">Welcome, {user?.name}!</p>
                </div>

                {/* Classrooms Section */}
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
                    <MdClass className="text-purple-500" /> Your Classrooms
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {classrooms.length > 0 ? (
                        classrooms.map((classroom) => (
                            <div key={classroom._id} className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-teal-500 transition-transform hover:scale-105">
                                <h3 className="text-lg sm:text-xl font-bold text-teal-600 flex items-center gap-2">
                                    <MdClass /> {classroom.name}
                                </h3>
                                <p className="text-gray-600">{classroom.subject}</p>
                                <p className="text-sm text-gray-500 mt-1">Credits: {classroom.credits}</p>

                                {/* Additional Classroom Info */}
                                <p className="text-gray-700 mt-2 flex items-center gap-2">
                                    <MdPeople className="text-green-500" />
                                    <strong>Students Enrolled:</strong> {classroom.totalStudents}
                                </p>
                                <p className="text-gray-700 flex items-center gap-2">
                                    <MdAssignment className="text-purple-500" />
                                    <strong>Total Assignments:</strong> {classroom.totalAssignments}
                                </p>

                                {/* Event Notification Input */}
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="Write event notification..."
                                        className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        value={notifications[classroom._id] || ""}
                                        onChange={(e) => handleNotificationChange(classroom._id, e)}
                                    />
                                    <button
                                        onClick={() => handleNotificationSubmit(classroom._id)}
                                        className="mt-3 w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all"
                                    >
                                        <MdSend /> Send Notification
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center w-full">No classrooms found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ProfessorDashboard;
