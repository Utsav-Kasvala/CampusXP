import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { FaClipboardList, FaEye, FaTasks, FaFileAlt, FaQuestionCircle } from "react-icons/fa"; // Import icons
import * as THREE from "three"; // Import Three.js

const CreatedClasses = () => {
  const { professorId } = useParams();
  const { user } = useContext(authContext);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const canvasRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    // Initialize StarField (Three.js)
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Starfield creation
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z position (depth)
      speeds[i] = Math.random() * 0.002 + 0.0005; // Different twinkle speeds
    }

    // Create points geometry for the stars
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material for the stars
    const material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, sizeAttenuation: true });

    // Create the point system (stars)
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 5;

    // Animation loop for the starfield effect
    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 0; i < numStars; i++) {
        positions[i * 3 + 2] += speeds[i]; // Move stars forward
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10; // Reset star depth
      }

      geometry.attributes.position.needsUpdate = true; // Update star positions
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/classrooms/professor/${user.professorId}/classes`
        );
        setClassrooms(response.data.classrooms);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch classrooms");
      }
    };

    fetchClassrooms();
  }, [user.professorId]);

  const handleTakeAttendance = async (joinCode) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/attendance/create/${joinCode}`
      );
      const attendanceId = response.data.attendanceId;
      navigate(`/professor/attendance/${joinCode}/${attendanceId}`);
    } catch (error) {
      console.error("Failed to create attendance:", error);
      setError("Could not create attendance. Please try again.");
    }
  };

  const handleCreateAssignment = (joinCode) => {
    navigate(`/professor/create-assignment/${joinCode}`);
  };

  const handleCreateQuiz = (joinCode) => {
    navigate(`/professor/create-quiz/${joinCode}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6 mt-20 overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-700">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-80">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">Created Classes</h1>
        <div className="text-lg font-medium mb-4 text-center">
          <p className="text-gray-700">Professor ID: {user.professorId || professorId}</p>
          <p className="text-gray-700">Professor Name: {user.name || "Not Available"}</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {classrooms.length > 0 ? (
          <ul className="space-y-6">
            {classrooms.map((classroom) => (
              <li
                key={classroom._id}
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-4">
                  <Link
                    to={`/professor/subject/${classroom.subjectName}`}
                    className="text-xl font-semibold text-indigo-600 hover:underline"
                  >
                    {classroom.subjectName}
                  </Link>
                  <p className="mt-2 text-gray-700">
                    <strong>Credits:</strong> {classroom.credits}
                  </p>
                  <p className="text-gray-700">
                    <strong>Join Code:</strong> {classroom.joinCode}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-md">
                  <button
                    onClick={() => handleTakeAttendance(classroom.joinCode)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md transition-all hover:bg-green-700 hover:shadow-lg"
                  >
                    <FaClipboardList /> Take Attendance
                  </button>
                  <Link
                    to={`/professor/attendance/${classroom.joinCode}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                  >
                    <FaEye /> View Attendance
                  </Link>
                  <button
                    onClick={() => handleCreateAssignment(classroom.joinCode)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md transition-all hover:bg-purple-700 hover:shadow-lg"
                  >
                    <FaTasks /> Create Assignment
                  </button>
                  <Link
                    to={`/professor/assignments/${classroom.joinCode}`}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md transition-all hover:bg-yellow-700 hover:shadow-lg"
                  >
                    <FaFileAlt /> View Assignments
                  </Link>
                  <button
                    onClick={() => handleCreateQuiz(classroom.joinCode)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
                  >
                    <FaQuestionCircle /> Create Quiz
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No classes created yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatedClasses;
