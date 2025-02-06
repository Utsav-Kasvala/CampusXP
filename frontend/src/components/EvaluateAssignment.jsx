import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFileAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import StarField from "./StarField";

const EvaluateAssignment = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/assignments/${assignmentId}/submissions`
        );
        setSubmissions(response.data.submissions);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch submissions");
      }
    };
    fetchSubmissions();
  }, [assignmentId]);

  const handleFeedbackChange = (index, value) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index].feedback = value;
    setSubmissions(updatedSubmissions);
  };

  const handlePointsChange = (index, value) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index].points = value;
    setSubmissions(updatedSubmissions);
  };

  const handleSubmitEvaluation = async (index) => {
    const { _id, feedback, points, studentId } = submissions[index];
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/assignments/${assignmentId}/submissions/${_id}/evaluate`,
        {
          feedback,
          grade: points,
          studentId,
        }
      );
      alert("Evaluation submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit evaluation");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6 mt-20 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-95">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">📄 Evaluate Submissions</h1>
        {error && (
          <p className="flex items-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded mb-6">
            <FaExclamationCircle className="text-xl" /> {error}
          </p>
        )}
        {submissions.length > 0 ? (
          <ul className="space-y-8">
            {submissions.map((submission, index) => (
              <li key={index} className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                <p className="text-lg font-medium text-gray-700">
                  <strong>👩‍🎓 Student:</strong> {submission.studentName}
                </p>
                <p className="text-gray-600">
                  <strong>📅 Submission Date:</strong> {new Date(submission.submissionDate).toLocaleDateString()}
                </p>
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  <FaFileAlt /> View File
                </a>
                <div className="mt-6">
                  <label className="block text-gray-700 font-semibold mb-2">📝 Feedback:</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                    rows="3"
                    placeholder="Enter feedback"
                    value={submission.feedback || ""}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">🎯 Points:</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                    placeholder="Enter points"
                    value={submission.points || ""}
                    onChange={(e) => handlePointsChange(index, e.target.value)}
                    min="0"
                  />
                </div>
                <button
                  onClick={() => handleSubmitEvaluation(index)}
                  className="mt-6 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition transform hover:scale-105"
                >
                  <FaCheckCircle /> Submit Evaluation
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-4">No submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default EvaluateAssignment;
