import React, { useContext } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { authContext } from '../context/AuthContext';
import studimg2 from '../assets/images/studimg2.gif';
import profimg from '../assets/images/profimg.gif';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(authContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-white to-blue-300 p-6 mt-20">
            <h1 className="text-6xl font-extrabold mb-8 text-gray-900 text-center">Welcome to CampusXP</h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mb-10">
            CampusXP empowers students and professors to efficiently manage schedules, collaborate through assignments, track attendance, engage in quizzes, and maintain seamless organization with ease.
            </p>

            <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Home for Academic Success</h2>
                <p className="text-gray-600 mb-6 text-center">
                    Stay connected, stay informed, and achieve more!
                </p>

                {/* Conditionally render based on user authentication */}
                {!user ? (
                    <div className="text-center">
                        <p className="mb-4">
                            Don&apos;t have an account?{' '}
                            <Link to='/Register' className="text-blue-600 hover:underline font-medium">Register here</Link>
                        </p>
                        <p>
                            Already have an account?{' '}
                            <Link to='/Login' className="text-blue-600 hover:underline font-medium">Login here</Link>
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">
                        You are logged in! Welcome back, <span className="font-bold text-gray-900">{user.name}</span>!
                    </p>
                )}
            </div>

            {/* Adding images and text for students and professors */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
                    <img 
                        src={studimg2} 
                        alt="Student" 
                        className="w-full object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800">For Students</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Manage your classes, track your progress, and stay ahead with CampusXP.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
                    <img 
                        src={profimg}
                        alt="Professor" 
                        className="w-full object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800">For Professors</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Organize your lectures, communicate with students, and simplify academic management.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
