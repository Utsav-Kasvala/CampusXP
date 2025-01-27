import Quiz from '../models/Quiz.js';
import Professor from '../models/Professor.js';

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
        console.error("Error creating quiz:", error);
        return res.status(500).json({ error: "Failed to create quiz" });
    }
};

// Fetch quizzes by joinCode
export const getQuizzesByJoinCode = async (req, res) => {
    const { joinCode } = req.params;

    try {
        const quizzes = await Quiz.find({ joinCode }); // Fetch all quizzes with the given joinCode
        //console.log(quizzes);
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: "No quizzes found for this classroom" });
        }
        res.status(200).json({ quizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};


// // Fetch all quizzes by professorId (if needed for professor dashboard)
// export const getQuizzesByProfessor = async (req, res) => {
//     const { professorId } = req.params;

//     try {
//         const quizzes = await Quiz.find({ professorId });
//         if (!quizzes) {
//             return res.status(404).json({ message: "No quizzes found for this professor" });
//         }

//         return res.status(200).json({ quizzes });
//     } catch (error) {
//         console.error("Error fetching quizzes:", error);
//         return res.status(500).json({ error: "Failed to fetch quizzes" });
//     }
// };
