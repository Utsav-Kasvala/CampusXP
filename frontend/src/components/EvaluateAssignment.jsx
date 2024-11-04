// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const EvaluateAssignment = () => {
//     const { assignmentId } = useParams();
//     const [submissions, setSubmissions] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/assignments/${assignmentId}/submissions`);
//                 setSubmissions(response.data.submissions);
//             } catch (err) {
//                 setError(err.response?.data?.message || "Failed to fetch submissions");
//             }
//         };
//         fetchSubmissions();
//     }, [assignmentId]);

//     return (
//         <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//             <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//                 <h1 className="text-2xl font-bold mb-6 text-center">Submissions for Assignment</h1>

//                 {error && <p className="text-red-500 mb-4">{error}</p>}

//                 {submissions.length > 0 ? (
//                     <ul className="space-y-4">
//                         {submissions.map((submission, index) => (
//                             <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
//                                 <p><strong>Student Name:</strong> {submission.studentName}</p>
//                                 <p><strong>Submission Date:</strong> {new Date(submission.submissionDate).toLocaleDateString()}</p>
//                                 <a
//                                     href={submission.fileUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
//                                 >
//                                     View Uploaded File
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500 text-center mt-4">No submissions found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EvaluateAssignment;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EvaluateAssignment = () => {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/assignments/${assignmentId}/submissions`);
                setSubmissions(response.data.submissions);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch submissions");
            }
        };
        fetchSubmissions();
    }, [assignmentId]);

    const handleFeedbackChange = (index, value) => {
        const updatedSubmissions = [...submissions];
        updatedSubmissions[index].feedback = value;
        setSubmissions(updatedSubmissions);
    };

    const handlePointsChange = (index, value) => {
        const updatedSubmissions = [...submissions];
        updatedSubmissions[index].points = value;
        setSubmissions(updatedSubmissions);
    };

    const handleSubmitEvaluation = async (index) => {
        const { _id, feedback, points } = submissions[index];
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/submissions/${_id}/evaluate`, { feedback, points });
            alert("Evaluation submitted successfully.");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to submit evaluation");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-20">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-10 text-center">Submissions for Assignment</h1>

                {error && <p className="text-red-500 mb-6">{error}</p>}

                {submissions.length > 0 ? (
                    <ul className="space-y-8">
                        {submissions.map((submission, index) => (
                            <li key={index} className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                                <p><strong>Student Name:</strong> {submission.studentName}</p>
                                <p><strong>Submission Date:</strong> {new Date(submission.submissionDate).toLocaleDateString()}</p>
                                <a
                                    href={submission.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    View Uploaded File
                                </a>

                                <div className="mt-6">
                                    <label className="block text-gray-700 font-semibold mb-2">Feedback:</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        rows="3"
                                        placeholder="Enter feedback"
                                        value={submission.feedback || ''}
                                        onChange={(e) => handleFeedbackChange(index, e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Points:</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter points"
                                        value={submission.points || ''}
                                        onChange={(e) => handlePointsChange(index, e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={() => handleSubmitEvaluation(index)}
                                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Submit Evaluation
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No submissions found.</p>
                )}
            </div>
        </div>
    );
};

export default EvaluateAssignment;
