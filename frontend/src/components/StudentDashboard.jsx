import React, { useContext, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { authContext } from '../context/AuthContext';
import ClassroomWiseAttendance from './Classroomwiseatt.jsx'; 
import TimeTable from './TimeTable.jsx'; 
import StarField from './StarField.jsx';
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Extend THREE if needed
extend(THREE);


const StudentDashboard = () => {
  const { user } = useContext(authContext);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 mt-16 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
      {/* 3D Star Background */}
      <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        
      </div>
      
      {/* Content Section */}
      <div className="relative z-10 w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-12 backdrop-blur-lg bg-opacity-90">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">Student Dashboard</h1>
        
        {/* Student Info */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-10">
          <div>
            <p className="text-2xl font-semibold">Welcome, {user?.name}!</p>
            <p className="text-lg"><strong>Student ID:</strong> {user?.studentId}</p>
          </div>
        </div>
        
        {/* TimeTable Section */}
        <div className="mb-10 w-full p-6 bg-gray-100 rounded-2xl shadow-md">
          <TimeTable />
        </div>

        {/* Classroom-wise Attendance Section */}
        <div className="mb-10 w-full p-6 bg-gray-100 rounded-2xl shadow-md">
          <ClassroomWiseAttendance />
        </div>

        {/* Additional Features Section */}
        <section className="w-full">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Upcoming Events & Announcements</h2>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-700">
              Stay tuned for updates on your courses, upcoming assignments, and events! 
              Make sure to check your emails and class notifications regularly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;