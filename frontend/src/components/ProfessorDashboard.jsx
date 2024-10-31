// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { authContext } from '../context/AuthContext';
// import axios from 'axios';

// const ProfessorDashboard = () => {
//     const { dispatch } = useContext(authContext);
//     const navigate = useNavigate();

//     // States for classroom creation inputs and success message
//     const [subjectName, setSubjectName] = useState("");
//     const [credits, setCredits] = useState("");
//     const [joinCode, setJoinCode] = useState("");
//     const [message, setMessage] = useState("");

//     // Handle logout
//     const handleLogout = () => {
//         dispatch({ type: "LOGOUT" });
//         navigate('/login');
//     };

//     // Handle classroom creation
//     const handleCreateClassroom = async () => {
//         try {
//             const response = await axios.post("/api/v1/classrooms/create", {
//                 subjectName,
//                 credits,
//                 professorName: "Professor Name" // Replace with dynamic professor name if available
//             });
//             setJoinCode(response.data.joinCode); // Set the join code after creation
//             setMessage(`Classroom created successfully! Join code: ${response.data.joinCode}`);
//             // Clear input fields after successful creation
//             setSubjectName("");
//             setCredits("");
//         } catch (error) {
//             setMessage("Error creating classroom: " + error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <>
//             <h1>Professor Dashboard</h1>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Subject Name"
//                     value={subjectName}
//                     onChange={e => setSubjectName(e.target.value)}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Credits"
//                     value={credits}
//                     onChange={e => setCredits(e.target.value)}
//                 />
//                 <button onClick={handleCreateClassroom}>Create Classroom</button>
//             </div>

//             {message && <p>{message}</p>}

//             <button onClick={handleLogout}>Logout</button>
//         </>
//     );
// };

// export default ProfessorDashboard;
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import axios from 'axios';

const ProfessorDashboard = () => {
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const [subjectName, setSubjectName] = useState("");
    const [credits, setCredits] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [message, setMessage] = useState("");

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/login');
    };

    const handleCreateClassroom = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/create`, {
                subjectName,
                credits,
                professorName: "Professor Name"
            });
            setJoinCode(response.data.joinCode);
            setMessage(`Classroom created successfully! Join code: ${response.data.joinCode}`);
            setSubjectName("");
            setCredits("");
        } catch (error) {
            console.error("Error creating classroom:", error);
            setMessage("Error creating classroom: " + (error.response?.data?.message || "Please try again later."));
        }
    };

    return (
        <>
            <h1>Professor Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={e => setSubjectName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Credits"
                    value={credits}
                    onChange={e => setCredits(e.target.value)}
                />
                <button onClick={handleCreateClassroom}>Create Classroom</button>
            </div>

            {message && <p>{message}</p>}
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default ProfessorDashboard;
