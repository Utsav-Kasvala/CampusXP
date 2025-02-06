import Professor from "../models/Professor.js";
import Classroom from "../models/Classroom.js";


export const getProfessorDashboard = async (req, res) => {
    try {
        const { professorId } = req.body;
        if (!professorId) {
            return res.status(400).json({ message: "Professor ID is required" });
        }
        // Find classrooms created by this professor (professorId is stored as a string)
        const classrooms = await Classroom.find({ professorId })
            .populate("students", "_id name") // Get student details
            .populate("assignments", "_id"); // Get assignment details

        if (!classrooms || classrooms.length === 0) {
            return res.status(404).json({ message: "No classrooms found" });
        }

        // Format response
        const formattedClassrooms = classrooms.map(classroom => ({
            _id: classroom._id,
            name: classroom.name,
            subject: classroom.subject,
            credits: classroom.credits,
            totalStudents: classroom.students.length, // Count of students
            totalAssignments: classroom.assignments.length, // Count of assignments
        }));
        console.lo
        res.status(200).json({
            professorId,
            classrooms: formattedClassrooms,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

