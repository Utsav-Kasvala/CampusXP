
import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    credits: { type: Number, required: true },
    joinCode: { type: String, required: true, unique: true },
    professorId: { type: String, ref: 'Professor', required: true }, // Reference to Professor using UUID
    professorName: { type: String, required: true }, // Add professor name
    students: [
        {
            id: { type: String, required: true }, // Student ID
            name: { type: String, required: true } // Student name
        }
    ],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }], // Array of Assignment references
    // Notifications stored within the classroom itself
    notifications: [
        {
            message: { type: String, required: true }, 
            timestamp: { type: Date, default: Date.now } // Auto-set timestamp
        }
    ]
});

const Classroom = mongoose.model('Classroom', classroomSchema);
export default Classroom;
