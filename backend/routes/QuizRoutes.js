import express from 'express';
import {createQuiz, getQuizbyId, getQuizzesByJoinCode}  from '../Controllers/QuizController.js'

const router = express.Router();
router.post('/create', createQuiz);
router.get('/classroom/:joinCode', getQuizzesByJoinCode);
router.get('/:quizId',getQuizbyId);

export default router;
