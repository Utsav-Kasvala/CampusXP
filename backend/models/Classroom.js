import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    credits: { type: Number, required: true },
    joinCode: { type: String, required: true, unique: true },
    professorName: { type: String, required: true },
    students: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Classroom = mongoose.model('Classroom', classroomSchema);
export default Classroom;
