import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const QuizAttemptPage = () => {
    const { quizId } = useParams();
    const { studentId } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizHide, setQuizHide] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); // Initialize as null, will be set after fetching the quiz
    const [timerActive, setTimerActive] = useState(false); // Whether the timer is running or not
    const [isSubmitted, setIsSubmitted] = useState(false); // Track whether the quiz is submitted

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/${quizId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setQuiz(data);

                // Initialize the timer after quiz data is fetched
                setTimeLeft(data.duration * 60); // Duration in seconds (assuming duration is in minutes)
                setTimerActive(true); // Start the timer once data is fetched
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("Failed to load quiz. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    useEffect(() => {
        let timerInterval;
        if (timerActive && timeLeft !== null && timeLeft > 0) {
            // Set an interval to update the timer every second
            timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Automatically submit the quiz when time runs out
            handleSubmit();
        }

        return () => clearInterval(timerInterval); // Cleanup the interval when the component unmounts or timer stops
    }, [timeLeft, timerActive]);

    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers({ ...answers, [questionIndex]: selectedOption });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${BASE_URL}/quiz/attempt`, {
                studentId,
                quizId,
                answers,
            });

            setScore(response.data.score);
            setQuizHide(true); // Hide the quiz once submitted
            setIsSubmitted(true); // Mark quiz as submitted

            // Show a success toast notification
            toast.success("Quiz submitted successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            toast.error("Failed to submit quiz. Please try again.", { autoClose: 3000 }); // Show error toast
        } finally {
            setIsSubmitting(false);
        }
    };

    const navigatetoQuiz = async () => {
        navigate('/quizzes');
    }

    if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading quiz...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center">{quiz.quizTitle}</h2>

            {/* Timer display - Only show if quiz is not submitted */}
            {!isSubmitted && timeLeft !== null && (
                <div className="text-center mb-6">
                    <p className="text-lg font-semibold flex items-center justify-center gap-2 text-gray-700">
                        <FaClock className="text-yellow-500" />
                        <span className="text-xl text-blue-600">
                            Time Remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </span>
                    </p>
                </div>
            )}

            {!quizHide && quiz.questions.map((question, index) => (
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

            {score !== null ? (
                <div className="text-center mt-6">
                    <p className="text-xl font-bold text-green-600">Your Score: {score} / {quiz.questions.length}</p>
                    <p className="text-xl font-bold text-green-600">Your Score has been updated on the leaderBoard, please check it</p>
                    <button className="w-full mt-6 py-3 text-white text-lg font-semibold rounded-md transition bg-green-600 hover:bg-green-700" onClick={navigatetoQuiz}>Go back to Quiz</button>
                </div>
            ) : (
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full mt-6 py-3 text-white text-lg font-semibold rounded-md transition ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </button>
            )}

            {/* ToastContainer for displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default QuizAttemptPage;
