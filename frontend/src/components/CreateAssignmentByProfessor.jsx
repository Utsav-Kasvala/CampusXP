import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { AiOutlineFilePdf, AiOutlineCheckCircle } from "react-icons/ai";
import { FaExclamationCircle, FaBook, FaUserTie, FaCalendarAlt, FaFileUpload } from "react-icons/fa";
import StarField from "./StarField";

const CreateAssignment = () => {
  const { joinCode } = useParams();
  const { user } = useContext(authContext);
  const [classroom, setClassroom] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalPoints, setTotalPoints] = useState(100);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join-code/${joinCode}`);
        setClassroom(response.data.classroom);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classroom details.");
      }
    };

    fetchClassroomDetails();
  }, [joinCode]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAssignmentCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("totalPoints", totalPoints);
    formData.append("professorId", user.professorId);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/classrooms/${joinCode}/assignment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(response.data.message);
      setError(null);
    } catch (err) {
      console.error("Failed to create assignment:", err);
      setError("Could not create assignment. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6 mt-20 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
      <div className="relative z-10 w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-95">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📚 Create New Assignment</h1>

        {error && (
          <p className="flex items-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
            <FaExclamationCircle className="text-xl" /> {error}
          </p>
        )}
        {successMessage && (
          <p className="flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded mb-4">
            <AiOutlineCheckCircle className="text-xl" /> {successMessage}
          </p>
        )}

        {classroom ? (
          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
              <h2 className="flex items-center gap-2 text-lg font-medium text-gray-700">
                <FaBook className="text-blue-600" /> Classroom: {classroom.subjectName}
              </h2>
              <p className="flex items-center gap-2 text-gray-600">
                <FaUserTie className="text-blue-600" /> Professor: {user.name || "Not Available"}
              </p>
              <p className="text-gray-600">
                <strong>Credits:</strong> {classroom.credits}
              </p>
              <p className="text-gray-600">
                <strong>Join Code:</strong> {joinCode}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-400"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-400"
                  placeholder="Provide assignment details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FaCalendarAlt /> Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Total Points</label>
                <input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(e.target.value)}
                  className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-400"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <AiOutlineFilePdf /> Upload Assignment PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 p-2 border rounded w-full file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded hover:file:bg-blue-700 transition"
                />
              </div>

              <button
                onClick={handleAssignmentCreate}
                className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition transform hover:scale-105"
              >
                <FaFileUpload /> Create Assignment
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading classroom details...</p>
        )}
      </div>
    </div>
  );
};

export default CreateAssignment;
