import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StarField from "./StarField";

const QuizCreationPage = () => {
  const { joinCode } = useParams();
  const { user } = useContext(authContext);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctOption: "",
  });
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (!currentQuestion.text || currentQuestion.options.some((opt) => !opt) || !currentQuestion.correctOption) {
      toast.error("Please fill in all fields for the question!");
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ text: "", options: ["", "", "", ""], correctOption: "" });
    toast.success("Question added successfully!");
  };

  const handleSaveQuiz = async () => {
    if (!quizTitle || questions.length === 0 || !duration) {
      toast.error("Please provide a quiz title, duration, and add at least one question!");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/quiz/create`, {
        professorId: user.professorId,
        joinCode,
        quizTitle,
        duration,
        questions,
      });
      toast.success("Quiz saved successfully!");
      navigate(`/professor/classrooms`);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      toast.error("Error saving quiz. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6 mt-10 bg-gradient-to-r from-indigo-900 to-blue-700">
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10 border border-gray-300">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Create Quiz</h1>
        <div className="space-y-4">
          <input type="text" placeholder="Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)}
            className="p-3 border border-gray-400 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500" />
          <input type="number" placeholder="Quiz Duration (in minutes)" value={duration} onChange={(e) => setDuration(e.target.value)}
            className="p-3 border border-gray-400 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500" />
          <div className="p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-inner">
            <input type="text" placeholder="Question" value={currentQuestion.text} onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
              className="p-3 border border-gray-400 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500 mb-3" />
            {currentQuestion.options.map((option, index) => (
              <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: currentQuestion.options.map((opt, idx) => idx === index ? e.target.value : opt) })}
                className="p-3 border border-gray-400 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500 mb-2" />
            ))}
            <select value={currentQuestion.correctOption} onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctOption: e.target.value })}
              className="p-3 border border-gray-400 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500">
              <option value="">Select Correct Option</option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>Option {index + 1}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <button onClick={handleAddQuestion} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">Add Question</button>
          <button onClick={handleSaveQuiz} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">Save Quiz</button>
        </div>
        {questions.length > 0 && (
          <div className="mt-8 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Added Questions</h2>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                  <p className="font-medium mb-2">{`${index + 1}. ${question.text}`}</p>
                  <ul className="list-disc pl-6 mb-2">
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex} className="text-gray-700">{option}</li>
                    ))}
                  </ul>
                  <p className="text-green-600 font-medium">Correct Answer: {question.correctOption}</p>
                  <button onClick={() => setQuestions(questions.filter((_, i) => i !== index))} className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuizCreationPage;
