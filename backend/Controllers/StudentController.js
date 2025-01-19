import Student from '../models/Student.js';

export const getclassromwiseattendance = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by studentId
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Extract the classroom-wise attendance
        const classroomWiseAttendance = student.classroomswiseattendance.map((record) => ({
            joinCode: record.joinCode,
            classname: record.classname,
            date: record.date,
            present: record.present,
        }));

        res.status(200).json({
            message: 'Classroom-wise attendance retrieved successfully.',
            classroomwiseattendance: classroomWiseAttendance,
        });
    } catch (error) {
        console.error('Error retrieving classroom-wise attendance:', error.message);
        res.status(500).json({
            message: 'An error occurred while retrieving classroom-wise attendance.',
            error: error.message,
        });
    }
};
