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
                setError("⚠️ Failed to fetch leaderboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankIcon = (rank) => {
        if (rank === 1) return <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-3xl animate-bounce" />;
        if (rank === 2) return <FontAwesomeIcon icon={faMedal} className="text-gray-500 text-2xl" />;
        if (rank === 3) return <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />;
        return <span className="text-lg font-bold">{rank}</span>;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-purple-900 p-8 mt-20">
            <div className="relative w-full max-w-3xl bg-gradient-to-r from-blue-300 to-purple-900 shadow-2xl rounded-2xl p-8">
                <h1 className="text-4xl font-extrabold text-center text-yellow-300 drop-shadow-lg mb-6">🏆 Leaderboard</h1>
                
                {loading ? (
                    <p className="text-center text-white text-lg">⏳ Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-400">{error}</p>
                ) : (
                    <table className="w-full border-collapse text-white">
                        <thead>
                            <tr className="bg-white/30 text-yellow-300 uppercase text-lg">
                                <th className="py-4 px-6 border-b-2">Rank</th>
                                <th className="py-4 px-6 border-b-2">Student Name</th>
                                <th className="py-4 px-6 border-b-2">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr 
                                    key={student.id} 
                                    className={`hover:bg-white/20 transition-all ${index < 3 ? "text-yellow-200 font-bold" : "text-white"}`}
                                >
                                    <td className="py-4 px-6 border-b text-center">{getRankIcon(index + 1)}</td>
                                    <td className="py-4 px-6 border-b">{student.name}</td>
                                    <td className="py-4 px-6 border-b text-center">{student.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
