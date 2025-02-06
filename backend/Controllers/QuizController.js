import Quiz from '../models/Quiz.js';
import Professor from '../models/Professor.js';
import QuizResponse from '../models/QuizResponse.js';
import Student from '../models/Student.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
    const { professorId, joinCode, quizTitle, duration, questions } = req.body;

    try {

        if (!duration || duration <= 0) {
            return res.status(400).json({ error: "Invalid quiz duration" });
        }

        // Check if professor exists
        const professor = await Professor.findOne({ professorId });
        if (!professor) {
            return res.status(404).json({ error: "Professor not found" });
        }

        // Create a new quiz
        const newQuiz = new Quiz({
            professorId,
            joinCode,
            quizTitle,
            duration,
            questions,
        });

        // Save quiz to the database
        await newQuiz.save();

        // Associate the quiz with the professor's classroom (optional, if needed)
        professor.classrooms.push(newQuiz._id);
        await professor.save();

        return res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
     //   console.error("Error creating quiz:", error);
        return res.status(500).json({ error: "Failed to create quiz" });
    }
};

// Fetch quizzes by joinCode
export const getQuizzesByJoinCode = async (req, res) => {
    const { joinCode, studentId } = req.params;

    try {
        const attemptedQuizIds = await QuizResponse.find({ studentId }).distinct("quizId");
        //console.log(attemptedQuizIds)

        const unattemptedQuizzes = await Quiz.find({ joinCode, _id: { $nin: attemptedQuizIds } });
        //console.log(unattemptedQuizzes)
        
        //console.log(quizzes);
        // if (!unattemptedQuizzes || unattemptedQuizzes.length===0) {
        //     return res.status(404).json({ message: "No quizzes found for this classroom" });
        // }
        res.status(200).json({ unattemptedQuizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};

export const getQuizResultByJoincode = async (req, res) => {
    const { joinCode } = req.params;
    //console.log(joinCode);
    try {

        const quizzes = await Quiz.find({ joinCode});
        res.status(200).json({ quizzes });
    } catch (error) {
      //  console.error("Error fetching A/NA Quizzes by students:", error);
        res.status(500).json({ error: "Failed to fetch A/NA  Quizzes" });
    }
};

export const getQuizStudentResult = async (req, res) => {
    try {
        const { quizId } = req.params;

        // Fetch quiz responses for the given quizId (exclude answers)
        const quizResponses = await QuizResponse.find({ quizId }).select("studentId score");

        // Fetch student details based on studentId
        const studentIds = quizResponses.map((qr) => qr.studentId);
        const students = await Student.find({ studentId: { $in: studentIds } }).select("studentId name email");

        // Create a map of studentId -> student details
        const studentMap = students.reduce((acc, student) => {
            acc[student.studentId] = student;
            return acc;
        }, {});

        // Attach student details to responses (excluding answers)
        const responsesWithStudentDetails = quizResponses.map((qr) => ({
            _id: qr._id,
            studentId: qr.studentId,
            name: studentMap[qr.studentId]?.name || "Unknown",
            email: studentMap[qr.studentId]?.email || "N/A",
            score: qr.score,
        }));

        res.status(200).json({ success: true, quizResponses: responsesWithStudentDetails });
    } catch (error) {
        console.error("Error fetching quiz results:", error);
        res.status(500).json({ success: false, message: "Failed to fetch quiz results" });
    }
};

export const getQuizbyId = async (req, res) => {
    //console.log(req.params.quizId);
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Error fetching quiz" });
    }
};

export const submitQuizAttempt = async (req, res) => {
    const { studentId, quizId, answers } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });

        let score = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctOption) {
                score++;
            }
        });

        const student = await Student.findOne({studentId});
        student.points+=score;
        await student.save();

        const newResponse = new QuizResponse({
            studentId,
            quizId,
            answers,
            score,
        });

        await newResponse.save();
        res.status(201).json({ message: "Quiz submitted successfully", score });
    } catch (error) {
      //  console.error("Error submitting quiz:", error);
        res.status(500).json({ error: "Failed to submit quiz" });
    }
};

