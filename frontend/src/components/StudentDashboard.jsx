import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx'; // Ensure this path is correct
import NavigationBar from './NavigationBar';

const StudentDashboard = () => {
  const { state, dispatch } = useContext(authContext); // Make sure you're using the correct context state
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  };

  return (
    <>
      <NavigationBar />
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Dashboard</h1>
        <div>
          {state.user?.name ? ( // Access user name safely
            <span>Welcome, {state.user.name}!</span>
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
