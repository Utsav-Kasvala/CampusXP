import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProfessorDashboard = () => {
    const { user, dispatch } = useContext(authContext); // Access user and professorId from user object
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar">
                <h1>CampusXP</h1>
                <ul>
                    <li onClick={() => navigate('/professor/dashboard')}>Home</li>
                    <li onClick={() => navigate('/professor/create-class')}>Create Class</li>
                    <li onClick={() => navigate('/professor/classrooms')}>Created Classes</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </nav>

            <h1>Professor Dashboard</h1>

            {/* Display professor's name and ID */}
            <div className="professor-info">
                <p><strong>Welcome,</strong> {user?.name}!</p>
                <p><strong>Professor ID:</strong> {user?.professorId}</p>
            </div>

            {/* Additional content for the dashboard */}
            <div>
                <h3>Your Classes and Activities</h3>
                {/* Add additional sections as needed */}
            </div>
        </div>
    );
};

export default ProfessorDashboard;
