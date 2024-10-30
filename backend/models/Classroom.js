// models/Classroom.js

import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    credits: { type: Number, required: true },
    professorName: { type: String, required: true },
    joinCode: { type: String, unique: true, required: true }, // Ensure it's unique and required
    students: [{ name: String }] // Optional field for students
});

const Classroom = mongoose.model('Classroom', classroomSchema);
export default Classroom;
