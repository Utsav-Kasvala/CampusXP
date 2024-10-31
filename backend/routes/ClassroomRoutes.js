// // import express from 'express';
// // import Classroom from '../models/Classroom.js';
// // import { v4 as uuidv4 } from 'uuid';

// // const router = express.Router();

// // // Middleware for detailed error handling
// // const asyncHandler = (fn) => (req, res, next) => {
// //     Promise.resolve(fn(req, res, next)).catch((error) => {
// //         console.error('Error occurred:', error);
// //         res.status(500).json({ message: "Internal server error. Please try again later." });
// //     });
// // };

// // // Create Classroom
// // router.post('/create', asyncHandler(async (req, res) => {
// //     const { subjectName, credits, professorName } = req.body;
// //     console.log("Creating classroom with data:", req.body);

// //     if (!subjectName || !credits || !professorName) {
// //         return res.status(400).json({ message: "All fields are required: subjectName, credits, professorName." });
// //     }
// //     if (isNaN(credits)) {
// //         return res.status(400).json({ message: "Credits must be a number." });
// //     }

// //     // Generate unique join code
// //     let joinCode;
// //     let classroomExists;
// //     do {
// //         joinCode = uuidv4();
// //         classroomExists = await Classroom.findOne({ joinCode });
// //     } while (classroomExists);

// //     const newClassroom = new Classroom({ subjectName, credits, joinCode, professorName });
// //     await newClassroom.save();
// //     res.status(201).json(newClassroom);
// // }));

// // // Join Classroom
// // router.post('/join', asyncHandler(async (req, res) => {
// //     const { code, studentId, studentName } = req.body;
// //     console.log("Joining classroom with code:", code, "and student:", { studentId, studentName });

// //     if (!code || !studentId || !studentName) {
// //         return res.status(400).json({ message: "Join code, student ID, and student name are required." });
// //     }

// //     const classroom = await Classroom.findOneAndUpdate(
// //         { joinCode: code },
// //         { $addToSet: { students: { id: studentId, name: studentName } } },
// //         { new: true }
// //     );

// //     if (!classroom) {
// //         return res.status(404).json({ message: "Classroom not found" });
// //     }

// //     res.status(200).json(classroom);
// // }));

// // // Get Classrooms Joined by a Student
// // router.get('/joined/:studentId', asyncHandler(async (req, res) => {
// //     const { studentId } = req.params;
// //     console.log("Fetching classrooms for student ID:", studentId);

// //     if (!studentId) {
// //         return res.status(400).json({ message: "Student ID is required." });
// //     }

// //     const classrooms = await Classroom.find({ "students.id": studentId });
// //     if (!classrooms.length) {
// //         return res.status(404).json({ message: "No classrooms found for this student." });
// //     }

// //     res.status(200).json(classrooms);
// // }));

// // // Get All Classrooms
// // router.get('/', asyncHandler(async (req, res) => {
// //     console.log("Fetching all classrooms...");
// //     const classrooms = await Classroom.find();
// //     res.status(200).json(classrooms);
// // }));


// // export default router;
// import express from 'express';
// import Classroom from '../models/Classroom.js';
// import Student from '../models/Student.js'; // Import the Student model
// import { v4 as uuidv4 } from 'uuid';

// const router = express.Router();

// // Middleware for detailed error handling
// const asyncHandler = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//         console.error('Error occurred:', error);
//         res.status(500).json({ message: "Internal server error. Please try again later." });
//     });
// };

// // Create Classroom
// router.post('/create', asyncHandler(async (req, res) => {
//     const { subjectName, credits, professorName } = req.body;
//     console.log("Creating classroom with data:", req.body);

//     if (!subjectName || !credits || !professorName) {
//         return res.status(400).json({ message: "All fields are required: subjectName, credits, professorName." });
//     }
//     if (isNaN(credits)) {
//         return res.status(400).json({ message: "Credits must be a number." });
//     }

//     // Generate unique join code
//     let joinCode;
//     let classroomExists;
//     do {
//         joinCode = uuidv4();
//         classroomExists = await Classroom.findOne({ joinCode });
//     } while (classroomExists);

//     const newClassroom = new Classroom({ subjectName, credits, joinCode, professorName });
//     await newClassroom.save();
//     console.log("Classroom created successfully:", newClassroom);
//     res.status(201).json(newClassroom);
// }));

// // Join Classroom
// router.post('/join', asyncHandler(async (req, res) => {
//     const { code, studentId, studentName } = req.body;
//     console.log("Joining classroom with code:", code, "and student:", { studentId, studentName });

//     if (!code || !studentId || !studentName) {
//         return res.status(400).json({ message: "Join code, student ID, and student name are required." });
//     }

//     // Find the classroom and add the student
//     const classroom = await Classroom.findOneAndUpdate(
//         { joinCode: code },
//         { $addToSet: { students: { id: studentId, name: studentName } } },
//         { new: true }
//     );

//     if (!classroom) {
//         console.error("Classroom not found with code:", code);
//         return res.status(404).json({ message: "Classroom not found" });
//     }

//     // Add classroom reference to the student's classrooms array
//     try {
//         await Student.findByIdAndUpdate(
//             studentId,
//             { $addToSet: { classrooms: classroom._id } }, // Assuming classrooms field is an array of ObjectId
//             { new: true }
//         );
//         console.log(`Student ${studentName} added to classroom ${classroom.subjectName}`);
//     } catch (error) {
//         console.error("Error adding classroom to student:", error);
//         return res.status(500).json({ message: "Failed to update student with classroom reference." });
//     }

//     res.status(200).json({ message: "Joined classroom successfully.", classroom });
// }));

// // Get Classrooms Joined by a Student
// router.get('/joined/:studentId', asyncHandler(async (req, res) => {
//     const { studentId } = req.params;
//     console.log("Fetching classrooms for student ID:", studentId);

//     if (!studentId) {
//         return res.status(400).json({ message: "Student ID is required." });
//     }

//     const classrooms = await Classroom.find({ "students.id": studentId });
//     if (!classrooms.length) {
//         console.log("No classrooms found for student ID:", studentId);
//         return res.status(404).json({ message: "No classrooms found for this student." });
//     }

//     res.status(200).json(classrooms);
// }));

// // Get All Classrooms
// router.get('/', asyncHandler(async (req, res) => {
//     console.log("Fetching all classrooms...");
//     const classrooms = await Classroom.find();
//     res.status(200).json(classrooms);
// }));

// export default router;
import express from 'express';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Import the Student model
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Middleware for detailed error handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error('Error occurred:', error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    });
};

// Create Classroom
router.post('/create', asyncHandler(async (req, res) => {
    const { subjectName, credits, professorName } = req.body;

    if (!subjectName || !credits || !professorName) {
        return res.status(400).json({ message: "All fields are required: subjectName, credits, professorName." });
    }
    if (isNaN(credits)) {
        return res.status(400).json({ message: "Credits must be a number." });
    }

    let joinCode;
    let classroomExists;
    do {
        joinCode = uuidv4();
        classroomExists = await Classroom.findOne({ joinCode });
    } while (classroomExists);

    const newClassroom = new Classroom({ subjectName, credits, joinCode, professorName });
    await newClassroom.save();
    res.status(201).json(newClassroom);
}));

// Join Classroom
router.post('/join', asyncHandler(async (req, res) => {
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
    try {
        // Ensure that studentId is in ObjectId format or adjust the Student model to accept UUIDs
        await Student.findOneAndUpdate(
            { studentId }, // Use the field that matches the identifier
            { $addToSet: { classrooms: classroom._id } },
            { new: true }
        );
    } catch (error) {
        console.error("Error adding classroom to student:", error); // Keep necessary debugging line
        return res.status(500).json({ message: "Failed to update student with classroom reference." });
    }

    res.status(200).json({ message: "Joined classroom successfully.", classroom });
}));

// Get Classrooms Joined by a Student
// router.get('/joined/:studentId', asyncHandler(async (req, res) => {
//     const { studentId } = req.params;

//     if (!studentId) {
//         return res.status(400).json({ message: "Student ID is required." });
//     }

//     const classrooms = await Classroom.find({ "students.id": studentId });
//     if (!classrooms.length) {
//         return res.status(404).json({ message: "No classrooms found for this student." });
//     }

//     res.status(200).json(classrooms);
// }));
// backend/routes/ClassroomRoutes.js
// router.get('/joined/:studentId', asyncHandler(async (req, res) => {
//     const { studentId } = req.params;
    
//     if (!studentId) {
//         return res.status(400).json({ message: "Student ID is required." });
//     }

//     // Find the student and populate their classrooms array with full classroom details
//     const student = await Student.findById(studentId).populate('classrooms');
//     if (!student || !student.classrooms.length) {
//         return res.status(404).json({ message: "No classrooms found for this student." });
//     }

//     res.status(200).json(student.classrooms);
// }));
// In ClassroomRoutes.js
// In ClassroomRoutes.js
router.get("/joined/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log("Received request to fetch joined classrooms for studentId:", studentId);

        const student = await Student.findOne({ studentId: studentId });
        console.log("Query executed. Student found:", student);

        if (!student) {
            console.log("No student found with studentId:", studentId);
            return res.status(404).json({ message: "Student not found" });
        }

        // Assuming we need to fetch classrooms the student has joined
        const classrooms = await Classroom.find({ _id: { $in: student.classrooms } });
        console.log("Classrooms retrieved for student:", classrooms);

        res.status(200).json({ studentName: student.name, studentId: student.studentId, classrooms });
    } catch (error) {
        console.error("Error fetching student or classrooms:", error.message);
        console.error("Full error details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get All Classrooms
router.get('/', asyncHandler(async (req, res) => {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
}));

export default router;
