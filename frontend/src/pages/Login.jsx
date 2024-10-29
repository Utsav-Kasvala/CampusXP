//import React from 'react'

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../config"
import { authContext } from "../context/AuthContext"

const Login = () => {
  const [formdata, setFormData] = useState({
    email:'',
    password:'',
  })

  const [loading,setLoading] =useState(false);

  const navigate = useNavigate();

  const {dispatch} =useContext(authContext) // ahiya thi start kaevanu che

  const handleInputChange= e=>{
    setFormData({...formdata, [e.target.name]:e.target.value})
  }

  const submitHandler = async event =>{
    //console.log(formdata)
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`,{
        method: 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })

      const result = await res.json()

      if(!res.ok){
        throw new Error(result.message)
      }

      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user: result.data,
          token: result.token,
          role:result.role,
        },
      })
     console.log(result,"login data");

      setLoading(false)
      
      {result.role=="student" && navigate('/studentdashboard')}
      {result.role=="professor" && navigate('/professordashboard')}

    } catch (err) {
      
      setLoading(false)
    }
  }

  return (
    


        <form className="py-4 md:py-0" onSubmit={submitHandler}>
        <div className="mb-5">
          <input 
          type="email" 
          placeholder="Enter Your Email" 
          name="email" 
          value={formdata.email} 
          onChange={handleInputChange}
          required
          />
        </div>

        <div className="mb-5">
          <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={formdata.password} 
          onChange={handleInputChange}
          required
          />
        </div>

        <div className="mt-7 flex  flex-col items-center justify-center">
        <button
           disabled={loading && true}
           type="submit" >
           Submit
          </button>
          
        </div>

        <p > Don&apos;t have an Account? 👉<Link to='/Register'> Register</Link></p>
      </form>
      
  )
}

export default Login