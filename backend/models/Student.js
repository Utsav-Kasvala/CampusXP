// // // import mongoose from "mongoose";
// // // import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique studentId

// // // const StudentSchema = new mongoose.Schema({
// // //   studentId: { type: String, unique: true, default: uuidv4 }, // Unique student identifier
// // //   email: { type: String, required: true, unique: true },
// // //   password: { type: String, required: true },
// // //   name: { type: String, required: true },
// // //   phone: { type: Number },
// // //   photo: { type: String },
// // //   role: {
// // //     type: String,
// // //     enum: ["student", "admin"],
// // //     default: "student",
// // //   },
// // //   classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }], // Array to store classroom IDs
// // // });

// // // // Set a pre-save hook to assign a unique studentId if it doesn’t already exist
// // // StudentSchema.pre("save", function (next) {
// // //   if (!this.studentId) {
// // //     this.studentId = uuidv4();
// // //   }
// // //   next();
// // // });

// // // export default mongoose.model("Student", StudentSchema);
// // import mongoose from "mongoose";
// // import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique studentId


// // const StudentSchema = new mongoose.Schema({
// //   // Unique student identifier, auto-generated if not provided
// //   studentId: { 
// //     type: String, 
// //     unique: true, 
// //     default: uuidv4 
// //   },
// //   email: { 
// //     type: String, 
// //     required: true, 
// //     unique: true 
// //   },
// //   password: { 
// //     type: String, 
// //     required: true 
// //   },
// //   name: { 
// //     type: String, 
// //     required: true 
// //   },
// //   phone: { 
// //     type: Number 
// //   },
// //   photo: { 
// //     type: String 
// //   },
// //   role: {
// //     type: String,
// //     enum: ["student", "admin"],
// //     default: "student",
// //   },
// //   // Array to store references to Classroom IDs
// //   classrooms: [{ 
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: "Classroom" 
// //   }],
// // });

// // // Set a pre-save hook to assign a unique studentId if it doesn’t already exist
// // StudentSchema.pre("save", function (next) {
// //   if (!this.studentId) {
// //     this.studentId = uuidv4();
// //   }
// //   next();
// // });

// // // Method to add a classroom reference
// // StudentSchema.methods.addClassroom = async function(classroomId) {
// //   if (!this.classrooms.includes(classroomId)) {
// //     this.classrooms.push(classroomId);
// //     await this.save();
// //   }
// // };

// // // Method to remove a classroom reference
// // StudentSchema.methods.removeClassroom = async function(classroomId) {
// //   this.classrooms = this.classrooms.filter(id => id.toString() !== classroomId.toString());
// //   await this.save();
// // };

// // export default mongoose.model("Student", StudentSchema);
// import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';

// const StudentSchema = new mongoose.Schema({
//   studentId: { 
//     type: String, 
//     unique: true, 
//     default: uuidv4 
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   password: { 
//     type: String, 
//     required: true 
//   },
//   name: { 
//     type: String, 
//     required: true 
//   },
//   phone: { 
//     type: Number 
//   },
//   photo: { 
//     type: String 
//   },
//   role: {
//     type: String,
//     enum: ["student", "admin"],
//     default: "student",
//   },
//   classrooms: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Classroom" 
//   }],
//   assignments: [{
//     assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }, // Reference to the Assignment
//     classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }, // Reference to the Classroom
//     submissionDate: { type: Date }, // Date when the student submitted, if applicable
//     grade: { type: Number }, // Grade assigned, if applicable
//     feedback: { type: String } // Feedback on the assignment, if applicable
//   }]
// });

// // Set a pre-save hook to assign a unique studentId if it doesn’t already exist
// StudentSchema.pre("save", function (next) {
//   if (!this.studentId) {
//     this.studentId = uuidv4();
//   }
//   next();
// });

// // Method to add a classroom reference
// StudentSchema.methods.addClassroom = async function(classroomId) {
//   if (!this.classrooms.includes(classroomId)) {
//     this.classrooms.push(classroomId);
//     await this.save();
//   }
// };

// // Method to remove a classroom reference
// StudentSchema.methods.removeClassroom = async function(classroomId) {
//   this.classrooms = this.classrooms.filter(id => id.toString() !== classroomId.toString());
//   await this.save();
// };

// // Method to add or update an assignment submission
// StudentSchema.methods.submitAssignment = async function(assignmentId, classroomId, submissionData) {
//   const existingAssignment = this.assignments.find(
//     assignment => 
//       assignment.assignment.toString() === assignmentId.toString() &&
//       assignment.classroomId.toString() === classroomId.toString()
//   );

//   if (existingAssignment) {
//     existingAssignment.submissionDate = submissionData.submissionDate || existingAssignment.submissionDate;
//     existingAssignment.grade = submissionData.grade || existingAssignment.grade;
//     existingAssignment.feedback = submissionData.feedback || existingAssignment.feedback;
//   } else {
//     this.assignments.push({
//       assignment: assignmentId,
//       classroomId: classroomId,
//       submissionDate: submissionData.submissionDate,
//       grade: submissionData.grade,
//       feedback: submissionData.feedback
//     });
//   }

//   await this.save();
// };

// export default mongoose.model("Student", StudentSchema);
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique studentId

const StudentSchema = new mongoose.Schema({
    studentId: { 
        type: String, 
        unique: true, 
        default: uuidv4 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
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
        type: String 
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
    classrooms: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Classroom" 
    }], // Array to store references to Classroom IDs
    assignments: [{
        assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }, // Reference to the Assignment
        classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }, // Reference to the Classroom
        submissionDate: { type: Date }, // Date when the student submitted, if applicable
        grade: { type: Number }, // Grade assigned, if applicable
        feedback: { type: String } // Feedback on the assignment, if applicable
    }]
});

// Set a pre-save hook to assign a unique studentId if it doesn’t already exist
StudentSchema.pre("save", function (next) {
    if (!this.studentId) {
        this.studentId = uuidv4();
    }
    next();
});

// Method to add or update an assignment submission
StudentSchema.methods.submitAssignment = async function(assignmentId, classroomId, submissionData) {
    const existingAssignment = this.assignments.find(
        assignment => 
            assignment.assignment.toString() === assignmentId.toString() &&
            assignment.classroomId.toString() === classroomId.toString()
    );

    if (existingAssignment) {
        existingAssignment.submissionDate = submissionData.submissionDate || existingAssignment.submissionDate;
        existingAssignment.grade = submissionData.grade || existingAssignment.grade;
        existingAssignment.feedback = submissionData.feedback || existingAssignment.feedback;
    } else {
        this.assignments.push({
            assignment: assignmentId,
            classroomId: classroomId,
            submissionDate: submissionData.submissionDate,
            grade: submissionData.grade,
            feedback: submissionData.feedback
        });
    }

    await this.save();
};

export default mongoose.model("Student", StudentSchema);
