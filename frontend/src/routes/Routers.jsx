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
      <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard/></ProtectedRoute>}/>
      <Route path="/professordashboard" element={<ProtectedRoute allowedRoles={['professor']}><ProfessorDashboard/></ProtectedRoute>}/>
    </Routes>
  )
}

export default Routers