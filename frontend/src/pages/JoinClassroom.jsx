// // pages/JoinClassroom.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const JoinClassroom = () => {
//     // State for classroom code input and join status message
//     const [code, setCode] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const { user } = useAuth(); // Access the user from context for ID and name

//     // Function to handle the classroom join process
//     const handleJoin = async (e) => {
//         e.preventDefault();
        
//         try {
//             // Send join request to the server with classroom code, student ID, and name
//             const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join`, {
//                 code,
//                 studentId: user?.id,
//                 studentName: user?.name,
//             });

//             setMessage('Joined classroom successfully!'); // Success message
            
//             // Additional actions or redirects can go here if needed
//         } catch (error) {
//             // Error handling for various cases
//             if (error.response && error.response.status === 404) {
//                 setMessage('Invalid code. Please check and try again.');
//             } else {
//                 setMessage('Error joining classroom. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Join Classroom</h2>
//             {/* Display the student's name */}
//             <p>Student Name: {user?.name}</p>
//             <form onSubmit={handleJoin}>
//                 <input 
//                     type="text" 
//                     placeholder="Enter Classroom Code" 
//                     value={code} 
//                     onChange={(e) => setCode(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Join</button>
//             </form>
//             {/* Display any message (success or error) */}
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default JoinClassroom;
// pages/JoinClassroom.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JoinClassroom = () => {
    // State for classroom code input and join status message
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user, studentId } = useAuth(); // Access user and studentId from context

    // Function to handle the classroom join process
    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            // Send join request to the server with classroom code, student ID, and name
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classrooms/join`, {
                code,
                studentId: studentId, // Use the studentId from context
                studentName: user?.name,
            });

            setMessage('Joined classroom successfully!'); // Success message
            // await axios.put(`${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/add-classroom`, {
            //     classroomId: response.data.classroomId // Assuming the response contains the classroomId
            // });
            
            // Additional actions or redirects can go here if needed
        } catch (error) {
            // Error handling for various cases
            console.log(error);
            if (error.response && error.response.status === 404) {
                setMessage('Invalid code. Please check and try again.');
            } else {
                setMessage('Error joining classroom. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Join Classroom</h2>
            {/* Display the student's name */}
            <p>Student Name: {user?.name}</p>
            <form onSubmit={handleJoin}>
                <input 
                    type="text" 
                    placeholder="Enter Classroom Code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                />
                <button type="submit">Join</button>
            </form>
            {/* Display any message (success or error) */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default JoinClassroom;
