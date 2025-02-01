import React from 'react';
import ClassroomWiseAttendance from './Classroomwiseatt.jsx'; 
import TimeTable from './TimeTable.jsx'; 
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useContext(authContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 m-12 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8 mt-20 text-gray-800">
          Welcome, {user ? user.name : 'Student'}!
        </h1>

        {/* TimeTable Section */}
        <section className="mb-16">
          <TimeTable />
        </section>

        {/* Classroom-wise Attendance Section */}
        <section className="mb-16">
          <ClassroomWiseAttendance />
        </section>

        {/* Additional Features Section (Optional) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Upcoming Events & Announcements</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 text-center">
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
