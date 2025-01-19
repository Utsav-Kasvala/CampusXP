import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    totalPoints: { type: Number, default: 100 }, // Total possible points for the assignment
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }, // Reference to the associated classroom
    professor: { type: String, required: true },
    submissions: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Reference to the student who submitted
        submissionDate: { type: Date },
        grade: { type: Number },
        feedback: { type: String },
        fileUrl: { type: String } // URL of the uploaded file (e.g., PDF or document)
    }],
    assignmentFileUrl: { type: String }, // URL of the assignment file if professor uploads one
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Assignment', AssignmentSchema);
// import mongoose from 'mongoose';

// const AssignmentSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         required: true 
//     },
//     description: { 
//         type: String 
//     },
//     dueDate: { 
//         type: Date, 
//         required: true 
//     },
//     totalPoints: { 
//         type: Number, 
//         default: 100 // Default total points
//     },
//     classroom: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Classroom', 
//         required: true 
//     },
//     professor: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Professor', // Use ObjectId for better reference consistency
//         required: true 
//     },
//     submissions: [
//         {
//             student: { 
//                 type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'Student', 
//                 required: true 
//             },
//             submissionDate: { 
//                 type: Date 
//             },
//             grade: { 
//                 type: Number 
//             },
//             feedback: { 
//                 type: String 
//             },
//             fileUrl: { 
//                 type: String 
//             }, // URL of the uploaded file
//             evaluated: { 
//                 type: Boolean, 
//                 default: false // Indicates if the submission has been evaluated
//             }
//         }
//     ],
//     assignmentFileUrl: { 
//         type: String // URL of the assignment file if uploaded by the professor
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// export default mongoose.model('Assignment', AssignmentSchema);
