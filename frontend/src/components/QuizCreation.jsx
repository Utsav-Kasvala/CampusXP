import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Corrected import
import 'react-toastify/dist/ReactToastify.css'; // CSS import for toasts

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
    if (
      !currentQuestion.text ||
      currentQuestion.options.some((opt) => !opt) ||
      !currentQuestion.correctOption
    ) {
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
      alert("Quiz saved successfully!");
      navigate(`/professor/classrooms`);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      toast.error("Error saving quiz. Please try again.");
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    toast.success("Question deleted successfully!");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Quiz</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Quiz Duration (in minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Question"
            value={currentQuestion.text}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, text: e.target.value })
            }
            className="mb-4 p-3 border border-gray-300 rounded-md w-full"
          />
          {currentQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  options: currentQuestion.options.map((opt, idx) =>
                    idx === index ? e.target.value : opt
                  ),
                })
              }
              className="mb-4 p-3 border border-gray-300 rounded-md w-full"
            />
          ))}
          <select
            value={currentQuestion.correctOption}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, correctOption: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Correct Option</option>
            {currentQuestion.options.map((option, index) => (
              <option key={index} value={option}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={handleAddQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Question
          </button>
          <button
            onClick={handleSaveQuiz}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Quiz
          </button>
        </div>

        {questions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Added Questions</h2>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <p className="font-medium mb-2">{`${index + 1}. ${question.text}`}</p>
                  <ul className="list-disc pl-6 mb-2">
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex} className="text-gray-700">
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p className="text-green-600 font-medium">
                    Correct Answer: {question.correctOption}
                  </p>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete Question
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ToastContainer /> {/* Correct placement of ToastContainer */}
    </div>
  );
};

export default QuizCreationPage;
