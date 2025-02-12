import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css'; 

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
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/${quizId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
                setQuiz(data);
                setTimeLeft(data.duration * 60);
                setTimerActive(true);
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
            timerInterval = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
        return () => clearInterval(timerInterval);
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
            setQuizHide(true);
            setIsSubmitted(true);
            toast.success("🎉 Quiz submitted successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            toast.error("❌ Failed to submit quiz. Please try again.", { autoClose: 3000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const navigatetoQuiz = () => navigate('/quizzes');

    if (loading) return <p className="text-center mt-20 text-lg font-semibold text-white">⏳ Loading quiz...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 via-purple-100 to-blue-300 mt-20 p-6">
            <div className="relative z-10 w-full max-w-3xl bg-blue-900 shadow-2xl rounded-2xl p-8 border border-white/30 text-white mt-5">
                <h2 className="text-4xl font-extrabold text-center text-yellow-300 drop-shadow-lg">{quiz.quizTitle}</h2>

                {/* Timer */}
                {!isSubmitted && timeLeft !== null && (
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold flex items-center justify-center gap-2">
                            <FaClock className="text-yellow-500 animate-pulse" />
                            <span className={`text-xl font-bold ${
                                timeLeft <= 60 ? "text-red-400" : "text-green-300"
                            }`}> Time left
                                ⏳ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                            </span>
                        </p>
                    </div>
                )}

                {/* Questions */}
                {!quizHide && quiz.questions.map((question, index) => (
                    <div key={index} className="mb-6 mt-6 p-4 bg-white/20 border border-white/30 rounded-xl shadow-lg">
                        <p className="font-semibold text-yellow-300 mb-2">{index + 1}. {question.text}</p>
                        <div className="flex flex-col gap-2">
                            {question.options.map((option, optIndex) => (
                                <label
                                    key={optIndex}
                                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                                        answers[index] === option
                                            ? "bg-green-100 border border-green-500 text-black"
                                            : "hover:bg-white/30"
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

                {/* Score Display */}
                {score !== null ? (
                    <div className="text-center mt-6">
                        <p className="text-xl font-bold text-green-400">🎯 Your Score: {score} / {quiz.questions.length}</p>
                        <p className="text-lg font-bold text-green-300">🏆 Updated on the Leaderboard!</p>
                        <button 
                            className="w-full mt-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md transition hover:bg-green-600"
                            onClick={navigatetoQuiz}
                        >
                            📜 Go back to Quizzes
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full mt-6 py-3 text-white text-lg font-semibold rounded-md transition-all ${
                            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : "🚀 Submit Quiz"}
                    </button>
                )}

                {/* Toast Notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default QuizAttemptPage;
