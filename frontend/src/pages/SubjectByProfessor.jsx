// SubjectDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const SubjectDetail = () => {
    const { subjectName } = useParams();

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
            <h1 className="text-3xl font-semibold mb-4 text-center">Subject Details</h1>
            <h2 className="text-2xl font-medium mb-2">Subject Name: <span className="text-blue-500">{subjectName}</span></h2>
            {/* Additional details or functionality can be added here */}
            <p className="text-lg text-gray-700 mt-2">
                Here you can provide more information about the subject, including the syllabus, objectives, and related resources.
            </p>
        </div>
    );
};

export default SubjectDetail;
