// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique studentId

// const StudentSchema = new mongoose.Schema({
//     studentId: { 
//         type: String, 
//         unique: true, 
//         default: uuidv4 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     points: { 
//         type: Number,
//         default:0,
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//     name: { 
//         type: String, 
//         required: true 
//     },
//     phone: { 
//         type: Number 
//     },
//     photo: { 
//         type: String 
//     },
//     role: {
//         type: String,
//         enum: ["student", "admin"],
//         default: "student",
//     },
//     classrooms: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "Classroom" 
//     }], // Array to store references to Classroom IDs
//     classroomswiseattendance: [
//         {
//             joinCode: { 
//                 type: String ,
//             },
//             classname:{
//                 type: String ,
//             },
//             date: { type: Date }, 
//             present: { type: Boolean} 
                
//         }
//     ],
//     assignments: [{
//         assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }, // Reference to the Assignment
//         classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }, // Reference to the Classroom
//         submissionDate: { type: Date }, // Date when the student submitted, if applicable
//         grade: { type: Number }, // Grade assigned, if applicable
//         feedback: { type: String } // Feedback on the assignment, if applicable
//     }]
// });

// // Set a pre-save hook to assign a unique studentId if it doesn’t already exist
// StudentSchema.pre("save", function (next) {
//     if (!this.studentId) {
//         this.studentId = uuidv4();
//     }
//     next();
// });

// // Method to add or update an assignment submission
// StudentSchema.methods.submitAssignment = async function(assignmentId, classroomId, submissionData) {
//     const existingAssignment = this.assignments.find(
//         assignment => 
//             assignment.assignment.toString() === assignmentId.toString() &&
//             assignment.classroomId.toString() === classroomId.toString()
//     );

//     if (existingAssignment) {
//         existingAssignment.submissionDate = submissionData.submissionDate || existingAssignment.submissionDate;
//         existingAssignment.grade = submissionData.grade || existingAssignment.grade;
//         existingAssignment.feedback = submissionData.feedback || existingAssignment.feedback;
//     } else {
//         this.assignments.push({
//             assignment: assignmentId,
//             classroomId: classroomId,
//             submissionDate: submissionData.submissionDate,
//             grade: submissionData.grade,
//             feedback: submissionData.feedback
//         });
//     }

//     await this.save();
// };

// export default mongoose.model("Student", StudentSchema);
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique studentId

const StudentSchema = new mongoose.Schema({
    studentId: { 
        type: String, 
        unique: true, 
        default: uuidv4 // Automatically generate a unique studentId
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    points: { 
        type: Number, 
        default: 0 // Initial points set to 0
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: Number 
    },
    photo: { 
        type: String // URL for the student's profile picture
    },
    role: {
        type: String,
        enum: ["student", "admin"], // Can be either "student" or "admin"
        default: "student"
    },
    classrooms: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Classroom" // References the Classroom model
    }],
    classroomswiseattendance: [
        {
            joinCode: { 
                type: String 
            },
            classname: { 
                type: String 
            },
            date: { 
                type: Date 
            }, 
            present: { 
                type: Boolean 
            }
        }
    ],
    assignments: [
        {
            assignment: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Assignment" // References the Assignment model
            },
            classroomId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Classroom" // References the Classroom model
            },
            submissionDate: { 
                type: Date // Date of assignment submission
            },
            grade: { 
                type: Number, // Grade received for the assignment
                default: null // Default grade is null
            },
            feedback: { 
                type: String // Feedback from the professor
            }
        }
    ]
});

// Pre-save hook to assign a unique studentId if not already present
StudentSchema.pre("save", function (next) {
    if (!this.studentId) {
        this.studentId = uuidv4();
    }
    next();
});

// Method to add or update an assignment submission
StudentSchema.methods.submitAssignment = async function (assignmentId, classroomId, submissionData) {
    const existingAssignment = this.assignments.find(
        (assignment) =>
            assignment.assignment.toString() === assignmentId.toString() &&
            assignment.classroomId.toString() === classroomId.toString()
    );

    if (existingAssignment) {
        // Update the existing assignment
        existingAssignment.submissionDate = submissionData.submissionDate || existingAssignment.submissionDate;
        existingAssignment.grade = submissionData.grade !== undefined ? submissionData.grade : existingAssignment.grade;
        existingAssignment.feedback = submissionData.feedback || existingAssignment.feedback;
    } else {
        // Add a new assignment entry
        this.assignments.push({
            assignment: assignmentId,
            classroomId: classroomId,
            submissionDate: submissionData.submissionDate,
            grade: submissionData.grade,
            feedback: submissionData.feedback
        });
    }

    await this.save(); // Save the updated student document
};

// Export the Student model
export default mongoose.model("Student", StudentSchema);
