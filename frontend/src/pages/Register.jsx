import  { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Signup = () => {


  const [loading,setLoading] =useState(false);

  const [formdata, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:'student',
  })

  const navigate = useNavigate();

  const handleInputChange= e=>{
    setFormData({...formdata, [e.target.name]:e.target.value})
  }

 

  const submitHandler = async event =>{
    //console.log(formdata)
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method: 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })

      const {message} = await res.json()

      if(!res.ok){
        throw new Error(message)
      }

      setLoading(false)
      navigate('/login')

    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <section className='px-5 xl:px-0'>
      <div className="max-w-[1050px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          

          {/*------------sign up form-----------------*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'> create an <span className='text-primaryColor'>Account</span></h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formdata.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
              <div >
                <label >
                  Are you a:
                  <select name="role" value={formdata.role}
                  onChange={handleInputChange}>
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                  </select>
                </label>

              </div>

             
         <div className="mt-7">
          <button
           disabled={loading && true}
           type="submit">
            Sign Up
          </button>
        </div>

        <p >Already have an Account? <Link to='/Login' > Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup