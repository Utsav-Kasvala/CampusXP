import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ClassroomQuizzes = () => {
    const { joinCode } = useParams();
    const { user } = useContext(authContext);
    const userId = user?.studentId;
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/classroom/${joinCode}/${userId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch quizzes");
                }

                const data = await response.json();
                setQuizzes(data.unattemptedQuizzes);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError("Failed to fetch quizzes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [joinCode]);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r  from-purple-200 via-indigo-200 to-blue-400 overflow-hidden mt-20">
            <div className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-blue-900 to-purple-900 shadow-2xl rounded-2xl p-8 border border-white/30 text-white mt-10">
                {/* Title */}
                <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
                    🚀 Quizzes for Classroom
                </h2>

                {/* Join Code */}
                {/* <p className="text-lg mt-4 text-center text-gray-200">
                    <span className="font-semibold text-yellow-300">🔑 Join Code:</span> {joinCode}
                </p> */}

                {/* Loading State */}
                {loading ? (
                    <p className="text-center text-lg animate-pulse text-gray-200 mt-6">
                        ⏳ Loading quizzes...
                    </p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : quizzes.length > 0 ? (
                    <ul className="mt-6 space-y-6">
                        {quizzes.map((quiz) => (
                            <li
                                key={quiz._id}
                                className="p-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-white/30"
                            >
                                <h3 className="text-2xl font-semibold text-orange-300">
                                    📖 {quiz.quizTitle}
                                </h3>
                                <p className="mt-2 text-gray-300">
                                    <span className="font-semibold text-white">⏳ Duration:</span> {quiz.duration} minutes
                                </p>
                                <p className="mt-1 text-gray-300">
                                    <span className="font-semibold text-white">❓ Questions:</span> {quiz.questions.length}
                                </p>
                                <Link to={`/attempt-quiz/${quiz._id}`}>
                                    <button className="mt-4 px-5 py-2 bg-gradient-to-r from-pink-500 to-red-400 text-white rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all">
                                        🎯 Attempt Quiz
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-lg text-gray-300 mt-6">
                        🚫 No quizzes found for this classroom.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClassroomQuizzes;
