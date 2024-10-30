// // routes/Routers.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';  
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Register';
// import ProtectedRoute from './ProtectedRoute';
// import StudentDashboard from '../components/StudentDashboard';
// import ProfessorDashboard from '../components/ProfessorDashboard';
// import JoinClassroom from '../pages/JoinClassroom'; // Import the JoinClassroom component
// import JoinedClassrooms from '../pages/JoinedClassrooms'; // Import the JoinedClassrooms component

// const Routers = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Signup />} />
//             <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
//             <Route path="/professordashboard" element={<ProtectedRoute allowedRoles={['professor']}><ProfessorDashboard /></ProtectedRoute>} />
//             <Route path="/join-classroom" element={<JoinClassroom />} /> {/* Add the new route */}
//             <Route path="/joined-classrooms" element={<ProtectedRoute allowedRoles={['student']}><JoinedClassrooms /></ProtectedRoute>} /> {/* New route */}
//         </Routes>
//     );
// };

// export default Routers;
import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Register'
import {Routes,Route} from 'react-router-dom'  
import ProtectedRoute from './ProtectedRoute'
import StudentDashboard from '../components/StudentDashboard'
import ProfessorDashboard from '../components/ProfessorDashboard'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
      {/* <Route path='/studentdashboard' element={<StudentDashboard/>}/> */}
      <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard/></ProtectedRoute>}/>
      <Route path="/professordashboard" element={<ProtectedRoute allowedRoles={['professor']}><ProfessorDashboard/></ProtectedRoute>}/>
    </Routes>
  )
}

export default Routers