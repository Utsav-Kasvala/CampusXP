// // import React, { useContext } from 'react'; // Ensure useContext is imported
// // import { useNavigate } from 'react-router-dom';
// // import { authContext } from '../context/AuthContext.jsx';
// // import NavigationBar from './NavigationBar';

// // const StudentDashboard = () => {
// //     const { user, dispatch } = useContext(authContext); // Accessing the auth context
// //     const navigate = useNavigate();

// //     const handleLogout = () => {
// //         dispatch({ type: "LOGOUT" });
// //         navigate('/login');
// //     };

// //     return (
// //         <>
// //             <NavigationBar />
// //             <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
// //                 <h1>Student Dashboard</h1>
// //                 <div style={{ alignSelf: 'center' }}>
// //                     {user?.name ? ( // Safely accessing user name
// //                         <span>Welcome, {user.name}!</span>
// //                     ) : (
// //                         <span>Please log in.</span>
// //                     )}
// //                 </div>
// //                 <button onClick={handleLogout}>Logout</button>
// //             </div>
// //         </>
// //     );
// // };

// // export default StudentDashboard;
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { authContext } from '../context/AuthContext.jsx';
// import NavigationBar from './NavigationBar';

// const StudentDashboard = () => {
//     const { user, studentId, dispatch } = useContext(authContext); // Accessing user and studentId
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch({ type: "LOGOUT" });
//         navigate('/login');
//     };

//     return (
//         <>
//             <NavigationBar />
//             <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
//                 <h1>Student Dashboard</h1>
//                 <div style={{ alignSelf: 'center' }}>
//                     {user?.name ? ( 
//                         <span>Welcome, {user.name} (ID: {studentId})!</span> // Display name and studentId
//                     ) : (
//                         <span>Please log in.</span>
//                     )}
//                 </div>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//         </>
//     );
// };

// export default StudentDashboard;
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx'; // Import the auth context
import NavigationBar from './NavigationBar';

const StudentDashboard = () => {
    const { user, studentId, dispatch } = useContext(authContext); // Accessing the auth context
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/login');
    };

    return (
        <>
            <NavigationBar />
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <h1>Student Dashboard</h1>
                <div style={{ alignSelf: 'center' }}>
                    {user?.name ? (
                        <span>Welcome, {user.name}! Your ID is {studentId}</span> // Display studentId
                    ) : (
                        <span>Please log in.</span>
                    )}
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default StudentDashboard;

