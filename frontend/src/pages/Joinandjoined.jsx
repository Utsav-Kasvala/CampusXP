import React, { useState, useContext } from "react";
import JoinClassroom from "./JoinClassroom.jsx";
import JoinedClassrooms from "./JoinedClassrooms.jsx";
import { authContext } from "../context/AuthContext";

const Joinandjoined = () => {
  const { user } = useContext(authContext);
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);

  const handleJoinClassroom = (newClassroom) => {
    setJoinedClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-purple-200 to-blue-600 flex flex-col lg:flex-row items-start p-6 mt-16 gap-6">
      
      {/* Sticky Join Classroom Box (Left Side) */}
      <div className="lg:w-1/4 w-full">
        <div className="max-w-xs bg-white shadow-lg rounded-lg p-4 sticky top-6 m-4">
          <JoinClassroom onJoinClassroom={handleJoinClassroom} />
        </div>
      </div>

      {/* Main Section: Joined Classrooms */}
      <div className="flex-1 bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-lg bg-opacity-20 m-4">
        <h2 className="text-2xl font-bold text-center mb-6">Joined Classrooms</h2>
        <JoinedClassrooms classrooms={joinedClassrooms} />
      </div>

    </div>
  );
};

export default Joinandjoined;
