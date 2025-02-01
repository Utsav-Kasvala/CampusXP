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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-14">
            <div className="max-w-3xl w-full px-8 py-12 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Quiz Results</h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading results...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : results.length > 0 ? (
                    <ul className="space-y-6">
                        {results.map((result) => (
                            <li key={result._id} className="border rounded-lg px-6 py-4 bg-gray-50">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Student: {result.name} ({result.email})
                                </h3>
                                <p className="mt-2 text-gray-700">
                                    <strong>Score:</strong> {result.score}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowQuizResStu;
