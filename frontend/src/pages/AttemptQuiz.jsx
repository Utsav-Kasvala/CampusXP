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
    const [score, setScore] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizhide,setQuizHide] = useState(false)

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
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${BASE_URL}/quiz/attempt`, {
                studentId,
                quizId,
                answers,
            });
    
            setScore(response.data.score);
    
            // Remove quiz from UI after submission
            setQuizHide(true);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const navigatetoQuiz =async () => {
        navigate('/quizzes');
    }
    

    if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading quiz...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center">{quiz.quizTitle}</h2>

            {!quizhide && quiz.questions.map((question, index) => (
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
                    <p className="text-xl font-bold text-green-600">Your Score has been updated on leaderBoard, please check it</p>
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
        </div>
    );
};

export default QuizAttemptPage;
