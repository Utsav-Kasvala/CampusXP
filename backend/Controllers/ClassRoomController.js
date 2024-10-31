import express from 'express';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Import the Student model
import { v4 as uuidv4 } from 'uuid';
import Professor from '../models/Professor.js';
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error('Error occurred:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    });
};

export const create=asyncHandler(async (req, res) => {
    const { subjectName, credits, professorId, professorName } = req.body;

    // Check for required fields
    if (!subjectName || !credits || !professorId || !professorName) {
        return res.status(400).json({ message: "All fields are required: subjectName, credits, professorId, professorName." });
    }

    // Check if credits is a valid number
    if (isNaN(credits)) {
        return res.status(400).json({ message: "Credits must be a number." });
    }

    // Generate unique join code
    let joinCode;
    let classroomExists;
    do {
        joinCode = uuidv4();
        classroomExists = await Classroom.findOne({ joinCode });
    } while (classroomExists);

    // Create new classroom
    const newClassroom = new Classroom({ 
        subjectName, 
        credits: Number(credits), // Ensure credits is a number
        joinCode, 
        professorId, 
        professorName 
    });

    try {
        await newClassroom.save(); // Save the new classroom

        // Add the classroom reference to the professor's classrooms array
        await Professor.findOneAndUpdate(
            { professorId }, // Find the professor by their unique ID
            { $push: { classrooms: newClassroom._id } }, // Push the new classroom ID into the classrooms array
            { new: true } // Return the updated document
        );

        res.status(201).json(newClassroom); // Respond with the created classroom object
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export const CreatedClass=asyncHandler(async (req, res) => {
    const { professorId } = req.params;
    console.log(professorId);
    try {
        const professor = await Professor.findOne({ professorId }).populate('classrooms'); // Populate to get classroom details
        if (!professor) {
            console.log(professor);
            return res.status(404).json({ message: "Professor not found." });
        }
        

        // Extract the classroom details
        const classrooms = professor.classrooms.map(classroom => ({
            subjectName: classroom.subjectName,
            credits: classroom.credits,
            joinCode: classroom.joinCode,
        }));

        res.status(200).json({ professorId: professor.professorId, name: professor.name, classrooms });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
// Join Classroom
export const join= asyncHandler(async (req, res) => {
    const { code, studentId, studentName } = req.body;

    if (!code || !studentId || !studentName) {
        return res.status(400).json({ message: "Join code, student ID, and student name are required." });
    }

    const classroom = await Classroom.findOneAndUpdate(
        { joinCode: code },
        { $addToSet: { students: { id: studentId, name: studentName } } },
        { new: true }
    );

    if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
    }

    // Add classroom reference to the student's classrooms array
    await Student.findOneAndUpdate(
        { studentId },
        { $addToSet: { classrooms: classroom._id } },
        { new: true }
    );

    res.status(200).json({ message: "Joined classroom successfully.", classroom });
});

export const joined=asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    if (!studentId) {
        return res.status(400).json({ message: "Student ID is required." });
    }

    const student = await Student.findOne({ studentId });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const classrooms = await Classroom.find({ _id: { $in: student.classrooms } });
    res.status(200).json({ studentName: student.name, studentId: student.studentId, classrooms });
});

export const Default=asyncHandler(async (req, res) => {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
});