// Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faTrophy, faStar } from '@fortawesome/free-solid-svg-icons';

const Leaderboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/leaderboard`);
                setStudents(response.data.students);
            } catch (err) {
                console.error("Error fetching leaderboard:", err);
                setError("Failed to fetch leaderboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (rank) => {
        if (rank === 1) return <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-2xl" />;
        if (rank === 2) return <FontAwesomeIcon icon={faMedal} className="text-gray-500 text-2xl" />;
        if (rank === 3) return <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />;
        return rank;
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-md mt-20 mb-10">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Leaderboard</h1>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-blue-800 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 border-b-2">Rank</th>
                            <th className="py-3 px-4 border-b-2">Student Name</th>
                            <th className="py-3 px-4 border-b-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className={`hover:bg-gray-100 ${index < 3 ? 'font-semibold' : ''}`}>
                                <td className="py-3 px-4 border-b text-center">
                                    {getRankIcon(index + 1)}
                                </td>
                                <td className="py-3 px-4 border-b">{student.name}</td>
                                <td className="py-3 px-4 border-b text-center text-blue-600">{student.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;
