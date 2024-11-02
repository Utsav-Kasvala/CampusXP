// SubjectDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const SubjectDetails = () => {
    const { subjectName } = useParams(); // Get the subject name from the URL

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md mt-20">
            <h2 className="text-3xl font-bold mb-4 text-center">Subject: {subjectName}</h2>
            {/* Additional subject details can be added here */}
            <p className="text-lg text-gray-700">
                {/* Placeholder for additional details */}
                Here you can add more information about the subject, such as description, syllabus, or related resources.
            </p>
        </div>
    );
};

export default SubjectDetails;
