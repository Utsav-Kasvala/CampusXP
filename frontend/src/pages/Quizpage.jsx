import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ClassroomQuizzes = () => {
    const { joinCode } = useParams(); // Extract joinCode from the URL
    const {user} = useContext(authContext)
    const userId = user.studentId;
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
                console.log(data);
                setQuizzes(data.
                    unattemptedQuizzes
                    );
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-14">
            <div className="max-w-3xl w-full px-8 py-12 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
                    Quizzes for Classroom
                </h2>
                <p className="text-lg mb-6 text-center text-gray-700">
                    <strong>Join Code:</strong> {joinCode}
                </p>

                {loading ? (
                    <p className="text-center text-gray-600">Loading quizzes...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : quizzes.length > 0 ? (
                    <ul className="space-y-6">
                        {quizzes.map((quiz) => (
                            <li key={quiz._id} className="border rounded-lg px-6 py-4 bg-gray-50 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-semibold text-blue-600">{quiz.quizTitle}</h3>
                                <p className="mt-2 text-gray-700">
                                    <strong>Duration:</strong> {quiz.duration} minutes
                                </p>
                                <p className="mt-1 text-gray-700">
                                    <strong>Number of Questions:</strong> {quiz.questions.length}
                                </p>
                                <Link to={`/attempt-quiz/${quiz._id}`}>
                                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Attempt Quiz
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">
                        No quizzes found for this classroom.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClassroomQuizzes;
