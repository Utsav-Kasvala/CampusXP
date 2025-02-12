import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ShowQuizzes = () => {
  const { studentId, user: { name: studentName } = {} } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedClassrooms = async () => {
      if (!studentId) return;
      try {
        const res = await axios.get(`${BASE_URL}/classrooms/joined/${studentId}`);
        setClassrooms(res.data.classrooms);
      } catch (error) {
        console.error("Error fetching joined classrooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedClassrooms();
  }, [studentId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  from-purple-200 via-indigo-200 to-blue-400 p-8">
      <div className="max-w-6xl w-full p-8 mt-10 bg-gradient-to-b from-purple-900 to-blue-900 shadow-2xl rounded-3xl border border-white/20 text-white">
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          📚 Quiz Courses
        </h2>

        {/* Student Name */}
        <p className="text-lg mb-6 text-center font-semibold text-gray-200">
          <span className="text-white">👨‍🎓 Student Name:</span> {studentName}
        </p>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center text-lg animate-pulse text-gray-200">Loading classrooms...</p>
        ) : classrooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <div
                key={classroom._id}
                className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-white/30"
              >
                <Link
                  to={`/quizzes/${classroom.joinCode}`}
                  className="block text-white hover:text-yellow-300 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-2">{classroom.subjectName}</h3>
                </Link>
                <p className="text-md text-gray-300 mb-1">
                  <span className="font-semibold text-white">🎯 Credits:</span> {classroom.credits}
                </p>
                <p className="text-md text-gray-300">
                  <span className="font-semibold text-white">👨‍🏫 Professor:</span> {classroom.professorName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-200">No joined classrooms found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowQuizzes;
