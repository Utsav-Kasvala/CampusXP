import express from 'express';
import Classroom from '../models/Classroom.js';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique join codes

const router = express.Router();

// Create Classroom
router.post('/create', async (req, res) => {
    const { subjectName, credits, professorName } = req.body;

    // Validate input fields
    if (!subjectName || !credits || !professorName) {
        return res.status(400).json({ message: "All fields are required: subjectName, credits, professorName." });
    }

    if (isNaN(credits)) {
        return res.status(400).json({ message: "Credits must be a number." });
    }

    try {
        // Generate a unique join code for the classroom
        let joinCode;
        let classroomExists;
        do {
            joinCode = uuidv4();
            classroomExists = await Classroom.findOne({ joinCode });
        } while (classroomExists);

        // Create and save the new classroom
        const newClassroom = new Classroom({ subjectName, credits, joinCode, professorName });
        await newClassroom.save();
        res.status(201).json(newClassroom);

    } catch (error) {
        console.error('Error creating classroom:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Duplicate key error. Ensure joinCode is unique." });
        }
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Join Classroom
router.post('/join', async (req, res) => {
    const { code, studentId, studentName } = req.body;

    // Validate join code and student information
    if (!code || !studentId || !studentName) {
        return res.status(400).json({ message: "Join code, student ID, and student name are required." });
    }

    try {
        // Find classroom by join code and add student if the classroom exists
        const classroom = await Classroom.findOneAndUpdate(
            { joinCode: code },
            { $addToSet: { students: { id: studentId, name: studentName } } }, // Prevent duplicate entries for the same student
            { new: true }
        );

        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        res.status(200).json(classroom);
    } catch (error) {
        console.error('Error joining classroom:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Get Classrooms Joined by a Student
router.get('/joined/:studentId', async (req, res) => {
    const { studentId } = req.params;

    // Validate studentId
    if (!studentId) {
        return res.status(400).json({ message: "Student ID is required." });
    }

    try {
        // Find classrooms containing this student
        const classrooms = await Classroom.find({ "students.id": studentId });

        if (!classrooms.length) {
            return res.status(404).json({ message: "No classrooms found for this student." });
        }

        res.status(200).json(classrooms);
    } catch (error) {
        console.error('Error retrieving classrooms for student:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Get All Classrooms
router.get('/', async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        console.error('Error retrieving classrooms:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

export default router;
