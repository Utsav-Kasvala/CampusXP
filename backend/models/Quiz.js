import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    professorId: { type: String, required: true },
    joinCode: { type: String, required: true },
    quizTitle: { type: String, required: true },
    questions: [
        {
            text: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctOption: { type: String, required: true },
        }
    ]
});

export default mongoose.model('Quiz', QuizSchema);
