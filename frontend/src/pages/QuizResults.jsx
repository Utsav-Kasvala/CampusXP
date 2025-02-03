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
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 mt-20">
    // <StarField/> 
    //   <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
    <div className="relative min-h-screen flex flex-col items-center p-6 mt-20 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
    <StarField/>
    <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-90">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Quizzes Courses
        </h1>
        <div className="text-lg font-medium mb-4">
          <p>Professor ID: {user.professorId || professorId}</p>
          <p>Professor Name: {user.name || "Not Available"}</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {classrooms.length > 0 ? (
          <ul className="space-y-6">
            {classrooms.map((classroom) => (
              <li
                key={classroom._id}
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50"
              >
                <div className="mb-4">
                  <Link
                    to={`/quizResutShow/${classroom.subjectName}/${classroom.joinCode}/`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {classroom.subjectName}
                    </h3>
                  </Link>
                  <p className="mt-2 text-gray-700">
                    <strong>Credits:</strong> {classroom.credits}
                  </p>
                  <p className="text-gray-700">
                    <strong>Join Code:</strong> {classroom.joinCode}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No classes created yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizResPage;
