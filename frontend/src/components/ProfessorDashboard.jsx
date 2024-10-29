import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext.jsx'
const StudentDashboard = () => {
 const {dispatch} =useContext(authContext);
 const navigate=useNavigate()

 const handleLogout =()=>{
  dispatch({type:"LOGOUT"})
 }
  return (<>
      <div>ProfesorDashboard</div>

      <button onClick={handleLogout} >Logout</button>
     </>

  )
}

export default StudentDashboard