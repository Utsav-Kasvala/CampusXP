// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { authContext } from '../context/AuthContext';
// import axios from 'axios';

// const CreatedClasses = () => {
//     const { professorId } = useParams();
//     const { user } = useContext(authContext);
//     const [classrooms, setClassrooms] = useState([]);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchClassrooms = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classrooms/professor/${user.professorId}/classes`);
//                 setClassrooms(response.data.classrooms);
//             } catch (err) {
//                 console.log(err);
//                 setError(err.response?.data?.message || "Failed to fetch classrooms");
//             }
//         };

//         fetchClassrooms();
//     }, [user.professorId]);

//     const handleTakeAttendance = async (joinCode) => {
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/attendance/create/${joinCode}`);
//             const attendanceId = response.data.attendanceId;
//             navigate(`/professor/attendance/${joinCode}/${attendanceId}`);
//         } catch (error) {
//             console.error("Failed to create attendance:", error);
//             setError("Could not create attendance. Please try again.");
//         }
//     };

//     const handleCreateAssignment = (joinCode) => {
//         navigate(`/professor/create-assignment/${joinCode}`);
//     };

//     return (
//         <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
//             <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//                 <h1 className="text-2xl font-bold mb-6 text-center">Created Classes</h1>
//                 <h2 className="text-lg font-medium mb-2">Professor ID: {user.professorId || professorId}</h2>
//                 <h2 className="text-lg font-medium mb-4">Professor Name: {user.name || "Not Available"}</h2>

//                 {error && <p className="text-red-500 mb-4">{error}</p>}

//                 {classrooms.length > 0 ? (
//                     <ul className="space-y-4">
//                         {classrooms.map(classroom => (
//                             <li key={classroom._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
//                                 <Link to={`/professor/subject/${classroom.subjectName}`} className="text-blue-600 hover:underline text-xl font-semibold">
//                                     {classroom.subjectName}
//                                 </Link>
//                                 <p className="mt-2"><strong>Credits:</strong> {classroom.credits}</p>
//                                 <p><strong>Professor:</strong> {user.name || "Not Available"}</p>
//                                 <p><strong>Join Code:</strong> {classroom.joinCode}</p>
                                
//                                 <div className="mt-4 flex space-x-2">
//                                     <button
//                                         onClick={() => handleTakeAttendance(classroom.joinCode)}
//                                         className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
//                                     >
//                                         Attendance
//                                     </button>
//                                     <Link to={`/professor/attendance/${classroom.joinCode}`}>
//                                         <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
//                                             View Att.
//                                         </button>
//                                     </Link>
//                                     <button
//                                         onClick={() => handleCreateAssignment(classroom.joinCode)}
//                                         className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
//                                     >
//                                         New Assign.
//                                     </button>
//                                     <Link to={`/professor/assignments/${classroom.joinCode}`}>
//                                         <button className="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm">
//                                             View Assign.
//                                         </button>
//                                     </Link>
                                    
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500 text-center mt-4">No classes created yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CreatedClasses;
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";

const CreatedClasses = () => {
  const { professorId } = useParams();
  const { user } = useContext(authContext);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 mt-20">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Created Classes
        </h1>
        <div className="text-lg font-medium mb-4">
          <p>Professor ID: {user.professorId || professorId}</p>
          <p>Professor Name: {user.name || "Not Available"}</p>
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
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50"
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
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleTakeAttendance(classroom.joinCode)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Take Attendance
                  </button>
                  <Link
                    to={`/professor/attendance/${classroom.joinCode}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Attendance
                  </Link>
                  <button
                    onClick={() => handleCreateAssignment(classroom.joinCode)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Create Assignment
                  </button>
                  <Link
                    to={`/professor/assignments/${classroom.joinCode}`}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    View Assignments
                  </Link>
                  <button
                    onClick={() => handleCreateQuiz(classroom.joinCode)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Create Quiz
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
