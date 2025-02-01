import React, { useState } from 'react';
import JoinClassroom from './JoinClassroom.jsx'; 
import JoinedClassrooms from './JoinedClassrooms.jsx';
import { useContext } from 'react';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 m-12 bg-white shadow-md rounded-lg">

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
