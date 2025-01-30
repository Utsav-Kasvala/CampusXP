import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config";

const QuizAttemptPage = () => {
    const { quizId } = useParams();
    const { studentId } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/${quizId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setQuiz(data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("Failed to load quiz. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers({ ...answers, [questionIndex]: selectedOption });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`${BASE_URL}/quiz/attempt`, {
                studentId,
                quizId,
                answers,
            });
            alert("Quiz submitted successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz.");
        }
    };

    if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading quiz...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center">{quiz.quizTitle}</h2>

            {quiz.questions.map((question, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold mb-2">{index + 1}. {question.text}</p>
                    <div className="flex flex-col gap-2">
                        {question.options.map((option, optIndex) => (
                            <label
                                key={optIndex}
                                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                                    answers[index] === option
                                        ? "bg-green-100 border border-green-500"
                                        : "hover:bg-gray-200"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(index, option)}
                                    className="cursor-pointer"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="w-full mt-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
            >
                Submit Quiz
            </button>
        </div>
    );
};

export default QuizAttemptPage;
