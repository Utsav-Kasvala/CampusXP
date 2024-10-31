// // JoinedClassrooms.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../config';
// import { useAuth } from '../context/AuthContext';

// const JoinedClassrooms = () => {
//     const { studentId, user: { name: studentName } = {} } = useAuth();
//     const [classrooms, setClassrooms] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchJoinedClassrooms = async () => {
//             if (!studentId) return;  // Guard against undefined studentId
//             try {
//                 const res = await axios.get(`${BASE_URL}/classrooms/joined/${studentId}`);
//                 console.log(res);
//                 setClassrooms(res.data);
//             } catch (error) {
//                 console.error("Error fetching joined classrooms:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJoinedClassrooms();
//     }, [studentId]);

//     return (
//         <div>
//             <h2>Joined Classrooms</h2>
//             <p><strong>Student Name:</strong> {studentName}</p>
//             <p><strong>Student ID:</strong> {studentId}</p>
//             {/* Render classrooms here */}
//         </div>
//     );
// };

// export default JoinedClassrooms;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation

const JoinedClassrooms = () => {
    const { studentId, user: { name: studentName } = {} } = useAuth();
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedClassrooms = async () => {
            if (!studentId) return;  // Guard against undefined studentId
            try {
                const res = await axios.get(`${BASE_URL}/classrooms/joined/${studentId}`);
                console.log(res);
                setClassrooms(res.data.classrooms); // Assuming the data structure includes a `classrooms` field
            } catch (error) {
                console.error("Error fetching joined classrooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedClassrooms();
    }, [studentId]);

    return (
        <div>
            <h2>Joined Classrooms</h2>
            <p><strong>Student Name:</strong> {studentName}</p>
            <p><strong>Student ID:</strong> {studentId}</p>
            {loading ? (
                <p>Loading classrooms...</p>
            ) : (
                classrooms.length > 0 ? (
                    <ul>
                        {classrooms.map(classroom => (
                            <li key={classroom._id}>
                                <Link to={`/subject/${classroom.subjectName}`}> {/* Make subject name clickable */}
                                    <h3>{classroom.subjectName}</h3>
                                </Link>
                                <p><strong>Credits:</strong> {classroom.credits}</p>
                                <p><strong>Professor:</strong> {classroom.professorName}</p>
                                <p><strong>Join Code:</strong> {classroom.joinCode}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No joined classrooms found.</p>
                )
            )}
        </div>
    );
};

export default JoinedClassrooms;
