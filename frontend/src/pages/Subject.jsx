// SubjectDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const SubjectDetails = () => {
    const { subjectName } = useParams(); // Get the subject name from the URL

    return (
        <div>
            <h2>Subject: {subjectName}</h2>
            {/* Additional subject details can be added here */}
        </div>
    );
};

export default SubjectDetails;
