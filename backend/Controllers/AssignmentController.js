import Assignment from '../models/Assignment.js';
import Student from '../models/Student.js';
import cloudinary from '../config/cloudinaryConfig.js';


export const getAssignmentsByStudent = async (req, res) => {
    const { studentId } = req.params;
    const { classroomId } = req.query;

    try {
        const student = await Student.findOne({ studentId })
            .populate({
                path: 'assignments.assignment', 
                select: 'title description dueDate totalPoints professor fileUrl submissions', // Add `submissions`
            })
            .populate({
                path: 'assignments.classroomId',
                select: 'name',
            });

        if (!student || student.assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this student.' });
        }

        const filteredAssignments = student.assignments.filter((assignmentRecord) => {
            return assignmentRecord.classroomId?._id.toString() === classroomId;
        });

        if (filteredAssignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this classroom.' });
        }

        const formattedAssignments = filteredAssignments.map((assignmentRecord) => {
            const isSubmitted = assignmentRecord.assignment.submissions.some(
                (submission) => submission.student.toString() === student._id.toString()
            );
            return {
                _id: assignmentRecord.assignment._id,
                title: assignmentRecord.assignment.title,
                description: assignmentRecord.assignment.description,
                dueDate: assignmentRecord.assignment.dueDate,
                totalPoints: assignmentRecord.assignment.totalPoints,
                classroom: assignmentRecord.classroomId?.name,
                submissionDate: assignmentRecord.submissionDate,
                grade: assignmentRecord.grade || 'Not graded',
                feedback: assignmentRecord.feedback || 'No feedback',
                professor: assignmentRecord.assignment.professor,
                fileUrl: assignmentRecord.assignment.fileUrl,
                isSubmitted,
            };
        });

        res.status(200).json({ assignments: formattedAssignments });
    } catch (error) {
        console.error("Error fetching assignments for student:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export const submitAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { studentId } = req.body;

    try {
        // Retrieve the student using the studentId
        const student = await Student.findOne({ studentId });
        if (!student) return res.status(404).json({ message: 'Student not found.' });

        // Retrieve the assignment by ID and check if it exists
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found.' });

        let fileUrl = null;
        if (req.file) {
            // Upload file to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: 'assignments',
                resource_type: 'raw'  // Adjust resource type if you're uploading non-image files
            });
            fileUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded file
        }

        // Create the submission object with a reference to the student's object ID
        const submission = {
            student: student._id, // Store the student's object ID as reference
            submissionDate: new Date(),
            fileUrl, // Cloudinary file URL
        };

        // Add the submission to the assignment's submissions array
        assignment.submissions.push(submission);
        await assignment.save();

        res.status(200).json({ message: 'Assignment submitted successfully.' });
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

export const getAssignmentSubmissions = async (req, res) => {
    const { assignmentId } = req.params;
    console.log(assignmentId);
    try {
        const assignment = await Assignment.findById(assignmentId).populate({
            path: 'submissions.student',
            select: 'name', // Select only the student's name
        });

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }

        const submissionDetails = assignment.submissions.map((submission) => ({
            studentName: submission.student.name,
            submissionDate: submission.submissionDate,
            fileUrl: submission.fileUrl,
        }));

        res.status(200).json({ submissions: submissionDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};