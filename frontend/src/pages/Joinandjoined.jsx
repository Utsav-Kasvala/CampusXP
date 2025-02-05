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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-purple-200 to-blue-400 flex flex-col items-center p-6 mt-16">

      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 my-10 backdrop-blur-lg bg-opacity-20">
      
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-yellow-200 mb-10 text-center drop-shadow-lg">
          Join & View Classrooms
        </h1>

        {/* User Info */}
        <div className="text-white p-6 rounded-xl shadow-xl mb-10 bg-gradient-to-r from-blue-400 to-indigo-400">
          <p className="text-2xl font-semibold">Welcome, {user?.name}!</p>
        </div>

        {/* Join Classroom Section */}
        <section className="mb-16">
          <div className="p-6">
            <JoinClassroom onJoinClassroom={handleJoinClassroom} />
          </div>
        </section>

        {/* Joined Classrooms Section */}
        <section className="mb-16">
          <div className="p-6">
            <JoinedClassrooms classrooms={joinedClassrooms} />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Joinandjoined;
