import mongoose from "mongoose";

const QuizResponseSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: { type: Map, of: String, required: true },
    score: { type: Number, default: 0 },
});

export default mongoose.model("QuizResponse", QuizResponseSchema);
