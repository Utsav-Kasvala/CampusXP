import React, { useContext, Suspense, useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { authContext } from '../context/AuthContext';
import ClassroomWiseAttendance from './Classroomwiseatt.jsx';
import TimeTable from './TimeTable.jsx';
import StarField from './StarField.jsx';
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { BASE_URL, token } from '../config.js';
import { FaStar } from 'react-icons/fa';
import Notifications from './Notifications.jsx';

// Extend THREE if needed
extend(THREE);


const StudentDashboard = () => {
  const { user } = useContext(authContext);
  const userId = user.studentId;
  const [profile, setProfile] = useState(null);

  const API_URL = `${BASE_URL}/studentProfile`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 mt-24 overflow-hidden bg-gradient-to-r from-blue-700 via-purple-400 to-indigo-800">
      {/* 3D Star Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <StarField />
        </Suspense>

      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full max-w-6xl shadow-2xl rounded-3xl p-12 backdrop-blur-lg ">
        <h1 className="text-4xl font-extrabold text-yellow-200 mb-8 text-center">Student Dashboard</h1>

        {/* Student Info */}
        {!profile ? "Loading... " : (<div className="flex items-center justify-between bg-gradient-to-r from-purple-400 via-purple-200 to-blue-300 text-yellow-200 p-6 rounded-2xl shadow-lg mb-10">

          {/* Welcome Message (Left) */}
          <p className="text-2xl font-semibold flex items-center">
            🎓 Hello, {user?.name}! Ready to Learn?
          </p>

          {/* Points Display (Right) */}
          <p className="text-2xl font-semibold flex items-center gap-2">
            <FaStar className="text-yellow-400" /> {profile.points} Points
          </p>

        </div>)}

        {/* Classroom-wise Attendance Section */}
        <div className="mb-5  w-full p-6 ">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-200">Attendance Chart</h2>
          <ClassroomWiseAttendance />
        </div>

        {/* Notifications Section */}
        <section className="w-full">
          <div className="p-6 text-center">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-200">Classroom Notifications</h2>
            {/* Notification Component */}
            <Notifications />
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;