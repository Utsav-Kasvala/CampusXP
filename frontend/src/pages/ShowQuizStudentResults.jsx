import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";

const ShowQuizResStu = () => {
    const { quizId } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/studentResults/${quizId}`);
                if (!response.ok) throw new Error("Failed to fetch quiz results");

                const data = await response.json();
                setResults(data.quizResponses);
            } catch (err) {
                console.error("Error fetching quiz results:", err);
                setError("Failed to load quiz results. Try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [quizId]);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-400 overflow-hidden mt-20">
            <div className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-blue-900 to-purple-900 shadow-2xl rounded-2xl p-8 border border-white/30 text-white mt-10 mb-5">
                <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">📊 Quiz Results</h2>

                {loading ? (
                    <p className="text-center text-lg animate-pulse text-gray-200 mt-6">⏳ Loading results...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : results.length > 0 ? (
                    <ul className="mt-6 space-y-6">
                        {results.map((result) => (
                            <li key={result._id} className="p-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-white/30">
                                <h3 className="text-2xl font-semibold text-yellow-300">👨‍🎓 {result.name} ({result.email})</h3>
                                <p className="mt-2 text-gray-300">
                                    <span className="font-semibold text-white">🏆 Score:</span> {result.score}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-lg text-gray-300 mt-6">🚫 No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowQuizResStu;
