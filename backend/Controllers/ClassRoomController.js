import express from 'express';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Import the Student model
import { v4 as uuidv4 } from 'uuid';
import Professor from '../models/Professor.js';
import cloudinary from '../config/cloudinaryConfig.js';
import Assignment from '../models/Assignment.js'
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error('Error occurred:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    });
};
//View Assignment
export const getAssignmentsByClassroomJoinCode = async (req, res) => {
    const { joinCode } = req.params;

    try {
        // Find the classroom using the join code and populate assignments
        const classroom = await Classroom.findOne({ joinCode }).populate({
            path: 'assignments',
            select: 'title description dueDate submissions', // Select fields, including submissions array
        });

        // Check if the classroom was found
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found.' });
        }

        // Check if assignments are available
        if (!classroom.assignments || classroom.assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this classroom.' });
        }

        // Format assignments to include submission count
        const formattedAssignments = classroom.assignments.map((assignment) => ({
            _id: assignment._id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            submissionCount: assignment.submissions.length, // Count of submissions
        }));

        // Return assignments with submission counts
        res.status(200).json({ assignments: formattedAssignments });
    } catch (error) {
       // console.error("Error fetching assignments:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
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
    //console.log(professorId);
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
//Create Assignment

export const createAssignment = async (req, res) => {
    const { joinCode } = req.params; // Classroom join code from URL params
    const { title, description, dueDate, totalPoints, professorId } = req.body; // Assignment details from request body
    const file = req.file; // File uploaded through multer

    try {
        // Find the classroom by joinCode
        const classroom = await Classroom.findOne({ joinCode }).populate('students'); // Populate students to access their IDs
        if (!classroom) return res.status(404).json({ message: 'Classroom not found.' });

        // Upload file to Cloudinary if file exists
        let fileUrl = null;
        if (file) {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: 'raw', // Use 'raw' for documents like PDFs
                folder: 'assignments' // Optional: specify folder on Cloudinary
            });
            fileUrl = result.secure_url; // Cloudinary's file URL
        }

        // Create a new assignment with fileUrl if provided
        const assignment = new Assignment({
            title,
            description,
            dueDate,
            totalPoints,
            classroom: classroom._id,
            professor: professorId,
            assignmentFileUrl: fileUrl // Store the uploaded file URL
        });

        await assignment.save();

        // Add the assignment reference to the classroom's assignments array
        classroom.assignments = classroom.assignments || [];
        classroom.assignments.push(assignment._id);
        await classroom.save();

        // Update each student's assignments array
        const studentUpdates = classroom.students.map(async (student) => {
            const studentRecord = await Student.findOne({ studentId: student.id });
            if (studentRecord) {
                studentRecord.assignments.push({
                    assignment: assignment._id,
                    classroomId: classroom._id
                });
                await studentRecord.save();
            }
        });
        await Promise.all(studentUpdates);

        res.status(201).json({ message: 'Assignment created and linked to students.', assignment });
    } catch (error) {
        //console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Failed to create assignment.' });
    }
};



export const getClassroomByJoinCode = async (req, res) => {
    try {
        const { joinCode } = req.params;

        // Find the classroom by joinCode
        const classroom = await Classroom.findOne({ joinCode });

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found.' });
        }

        // Return classroom details
        res.status(200).json({ classroom });
    } catch (error) {
        //console.error("Error fetching classroom by join code:", error);
        res.status(500).json({ message: 'Failed to retrieve classroom details.' });
    }
};
// Join Classroom
export const join = asyncHandler(async (req, res) => {
    const { code, studentId, studentName } = req.body;

    if (!code || !studentId || !studentName) {
        return res.status(400).json({ message: "Join code, student ID, and student name are required." });
    }

    // Find the classroom by joinCode
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


export const getStudentsByJoinCode = async (req, res) => {
    const { joinCode } = req.params;
   
    
    try {
        // Find the classroom by joinCode
        const classroom = await Classroom.findOne({ joinCode }).populate('students', 'name email'); // Populate students with selected fields

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        // Send the list of students as response
        res.status(200).json({ students: classroom.students });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ message: 'Failed to fetch students' });
    }
};

export const getProfessorDashboard = async (req, res) => {
    const { professorId} = req.params;
    try {
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
            name: classroom.subjectName,
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

export const addNotification = async (req, res) => {
    const { classroomId } = req.params;
    const { message } = req.body;
    try {

        // Validate input
        if (!message) {
            return res.status(400).json({ message: "Notification message is required" });
        }

        // Find the classroom and update notifications array
        const classroom = await Classroom.findByIdAndUpdate(
            classroomId,
            {
                $push: {
                    notifications: { message, timestamp: new Date() }
                }
            },
            { new: true } // Returns updated document
        );

        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        res.status(200).json({ message: "Notification added successfully", notifications: classroom.notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};