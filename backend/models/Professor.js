import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

const ProfessorSchema = new mongoose.Schema({
    professorId: { type: String, default: uuidv4, unique: true }, // Generate a unique professor ID
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    role: {
        type: String,
        default: 'professor', // Set default role to professor
    },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }], // Array of references to classrooms
    resetPasswordToken: {type: String},
    resetPasswordExpires:{type: Date},
});

// Optional: Pre-save hook to ensure the professorId is always generated
ProfessorSchema.pre('save', function(next) {
    if (!this.professorId) {
        this.professorId = uuidv4(); // Generate a unique ID if not already set
    }
    next();
});

export default mongoose.model("Professor", ProfessorSchema);
