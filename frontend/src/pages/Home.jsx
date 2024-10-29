import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
  return (<>
      <div>Home</div>
      <p > Don&apos;t have an Account? 👉<Link to='/Register'> Register</Link></p>
      <p >Already have an Account? <Link to='/Login' > Login</Link></p>
      </>

  )
}

export default Home