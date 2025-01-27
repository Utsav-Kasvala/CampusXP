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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Quiz Courses
        </h2>
        <p className="text-lg mb-4 text-center text-gray-700">
          <strong>Student Name:</strong> {studentName}
        </p>
        {loading ? (
          <p className="text-center">Loading classrooms...</p>
        ) : classrooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <div
                key={classroom._id}
                className="p-4 bg-gray-50 rounded shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <Link
                  to={`/quizzes/${classroom.joinCode}`}
                  className="block text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {classroom.subjectName}
                  </h3>
                </Link>
                <p className="text-md text-gray-700 mb-1">
                  <strong>Credits:</strong> {classroom.credits}
                </p>
                <p className="text-md text-gray-700">
                  <strong>Professor:</strong> {classroom.professorName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No joined classrooms found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowQuizzes;
