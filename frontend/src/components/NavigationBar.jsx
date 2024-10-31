import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Link to="/home" style={{ margin: '0 15px' }}>Home</Link>
      <Link to="/join-classroom" style={{ margin: '0 15px' }}>Join Classroom</Link>
      <Link to="/leaderboard" style={{ margin: '0 15px' }}>Leaderboard</Link>
      <Link to="/joined-classrooms" style={{ margin: '0 15px' }}>Joined Classrooms</Link>
      <Link to="/timeTable" style={{ margin: '0 15px' }}>TimeTable</Link>
    </nav>
  );
};

export default NavigationBar;
