import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    professorId: { type: String, required: true },
    joinCode: { type: String, required: true },
    quizTitle: { type: String, required: true },
    duration: { type: Number, required: true }, // Quiz duration in minutes
    questions: [
        {
            text: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctOption: { type: String, required: true },
        }
    ]
});

export default mongoose.model('Quiz', QuizSchema);
