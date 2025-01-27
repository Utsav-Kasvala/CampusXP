import express from 'express';
import {createQuiz, getQuizzesByJoinCode}  from '../Controllers/QuizController.js'

const router = express.Router();
router.post('/create', createQuiz);
router.get('/classroom/:joinCode', getQuizzesByJoinCode);

export default router;
