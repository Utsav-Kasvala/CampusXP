// //import React from 'react'

// import { useState, useContext } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { BASE_URL } from "../config"
// import { authContext } from "../context/AuthContext"

// const Login = () => {
//   const [formdata, setFormData] = useState({
//     email:'',
//     password:'',
//   })

//   const [loading,setLoading] =useState(false);

//   const navigate = useNavigate();

//   const {dispatch} =useContext(authContext) // ahiya thi start kaevanu che

//   const handleInputChange= e=>{
//     setFormData({...formdata, [e.target.name]:e.target.value})
//   }

//   const submitHandler = async event =>{
//     //console.log(formdata)
//     event.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/login`,{
//         method: 'post',
//         headers:{
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formdata)
//       })

//       const result = await res.json()

//       if(!res.ok){
//         throw new Error(result.message)
//       }

//       dispatch({
//         type:'LOGIN_SUCCESS',
//         payload:{
//           user: result.data,
//           token: result.token,
//           role:result.role,
//         },
//       })
//      console.log(result,"login data");

//       setLoading(false)
      
//       {result.role=="student" && navigate('/studentdashboard')}
//       {result.role=="professor" && navigate('/professordashboard')}

//     } catch (err) {
      
//       setLoading(false)
//     }
//   }

//   return (
    


//         <form className="py-4 md:py-0" onSubmit={submitHandler}>
//         <div className="mb-5">
//           <input 
//           type="email" 
//           placeholder="Enter Your Email" 
//           name="email" 
//           value={formdata.email} 
//           onChange={handleInputChange}
//           required
//           />
//         </div>

//         <div className="mb-5">
//           <input 
//           type="password" 
//           placeholder="Password" 
//           name="password" 
//           value={formdata.password} 
//           onChange={handleInputChange}
//           required
//           />
//         </div>

//         <div className="mt-7 flex  flex-col items-center justify-center">
//         <button
//            disabled={loading && true}
//            type="submit" >
//            Submit
//           </button>
          
//         </div>

//         <p > Don&apos;t have an Account? 👉<Link to='/Register'> Register</Link></p>
//       </form>
      
//   )
// }

// export default Login
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new submission

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      // Dispatch login success with user data, token, role, and studentId
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data, // Assuming this includes the student's data
          token: result.token,
          role: result.role,
          studentId: result.data.studentId || null, // Include studentId from result
        },
      });

      console.log(result, "login data");

      // Navigate based on user role
      if (result.role === "student") {
        navigate('/studentdashboard');
      } else if (result.role === "professor") {
        navigate('/professordashboard');
      }
    } catch (err) {
      setError(err.message); // Set error message to display
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <form className="py-4 md:py-0" onSubmit={submitHandler}>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

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

      <div className="mt-7 flex flex-col items-center justify-center">
        <button
          disabled={loading} // Disable button when loading
          type="submit"
        >
          {loading ? "Loading..." : "Submit"} {/* Show loading text */}
        </button>
      </div>

      <p>
        Don&apos;t have an Account? 👉<Link to='/Register'> Register</Link>
      </p>
    </form>
  );
};

export default Login;
