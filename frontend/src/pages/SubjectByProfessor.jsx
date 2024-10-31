import React from 'react';
import { useParams } from 'react-router-dom';

const SubjectDetail = () => {
    const { subjectName } = useParams();

    return (
        <div>
            <h1>Subject Details</h1>
            <h2>Subject Name: {subjectName}</h2>
            {/* You can add more details or functionality here */}
        </div>
    );
};

export default SubjectDetail;
