import express from 'express';
import {createQuiz, getQuizbyId, getQuizResultByJoincode, getQuizStudentResult, getQuizzesByJoinCode, submitQuizAttempt}  from '../Controllers/QuizController.js'

const router = express.Router();
router.post('/create', createQuiz);
router.get('/classroom/:joinCode/:studentId', getQuizzesByJoinCode);
router.get('/:quizId',getQuizbyId);
router.post('/attempt', submitQuizAttempt);
router.get('/result/:joinCode',getQuizResultByJoincode);
router.get("/studentResults/:quizId",getQuizStudentResult)

export default router;
