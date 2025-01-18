import express from "express";
import Student from "../models/Student.js";
import mongoose from "mongoose"; // To validate ObjectId
import {getclassromwiseattendance} from '../Controllers/StudentController.js'
const router = express.Router();


router.get("/:studentId/classroomwiseattendance",getclassromwiseattendance);



// Route to add classroom to a student's list
router.put("/:id/addClassroom", async (req, res) => {
    const { classroomId } = req.body;

    // Validate classroomId
    if (!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)) {
        return res.status(400).json({ message: "Valid classroomId is required." });
    }

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { classrooms: classroomId } }, // Adds only if it doesn't already exist
            { new: true } // Return the updated document
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Classroom added successfully.", student });
    } catch (error) {
        console.error("Error updating student's classrooms:", error);
        res.status(500).json({ message: "Error updating student's classrooms." });
    }
});

export default router;
