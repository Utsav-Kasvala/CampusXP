import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import StarField from "../components/StarField";

const QuizResPage = () => {
  const { professorId } = useParams();
  const { user } = useContext(authContext);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/classrooms/professor/${user.professorId}/classes`
        );
        setClassrooms(response.data.classrooms);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch classrooms");
      }
    };

    fetchClassrooms();
  }, [user.professorId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-400 p-8">
      <div className="max-w-6xl w-full p-8 mt-10 bg-gradient-to-b from-purple-900 to-blue-900 shadow-2xl rounded-3xl border border-white/20 text-white">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          📚 Quiz Courses
        </h2>

        <div className="text-lg font-medium mb-4 text-center">
          {/* <p>👨‍🏫 <span className="font-semibold text-white">Professor ID:</span> {user.professorId || professorId}</p> */}
          <p>👨‍🏫 <span className="font-semibold text-white">Professor Name:</span> {user.name || "Not Available"}</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {classrooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <div
                key={classroom._id}
                className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-white/30"
              >
                <Link
                  to={`/quizResutShow/${classroom.subjectName}/${classroom.joinCode}/`}
                  className="block text-white hover:text-yellow-300 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-2">{classroom.subjectName}</h3>
                </Link>
                <p className="text-md text-gray-300 mb-1">
                  <span className="font-semibold text-white">🎯 Credits:</span> {classroom.credits}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-200">No classes created yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizResPage;
