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
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useContext(authContext); // Context for authentication

    const handleInputChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(''); // Reset error message before making a new request

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: result.data,
                    token: result.token,
                    role: result.role,
                },
            });
            console.log(result, "login data");

            setLoading(false);

            // Redirect based on user role
         //   console.log(result.data.role);
            if (result.data.role === "student") {
              //console.log("hi\n");
                navigate('/studentdashboard');
            } else if (result.data.role === "professor") {
                navigate('/professordashboard');
            }
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Something went wrong. Please try again.'); // Set error message
        }
    };

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

            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

            <div className="mt-7 flex flex-col items-center justify-center">
                <button
                    disabled={loading}
                    type="submit"
                >
                    {loading ? 'Loading...' : 'Submit'} {/* Show loading state */}
                </button>
            </div>

            <p>
                Don&apos;t have an Account? 👉 <Link to='/register'>Register</Link>
            </p>
        </form>
    );
};

export default Login;
