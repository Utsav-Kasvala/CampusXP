import React, { useState, useContext } from 'react';
import JoinClassroom from './JoinClassroom.jsx'; 
import JoinedClassrooms from './JoinedClassrooms.jsx';
import { authContext } from '../context/AuthContext';

const Joinandjoined = () => {
  const { user } = useContext(authContext);

  // State to store joined classrooms
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);

  // Function to handle classroom join (update the joined classrooms list)
  const handleJoinClassroom = (newClassroom) => {
    setJoinedClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 mt-16">

      <div className="w-full max-w-6xl shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">Join & View Classrooms</h1>

        {/* User Info */}
        <div className="text-blue-700 p-6 rounded-xl shadow-xl mb-10">
          <p className="text-2xl font-semibold">Welcome, {user?.name}!</p>
          <p className="text-lg"><strong>User ID:</strong> {user?.id}</p>
        </div>

        {/* Join Classroom Section */}
        <section className="mb-16">
          <JoinClassroom onJoinClassroom={handleJoinClassroom} />
        </section>

        {/* Joined Classrooms Section */}
        <section className="mb-16">
          <JoinedClassrooms classrooms={joinedClassrooms} />
        </section>

      </div>
    </div>
  );
};

export default Joinandjoined;
