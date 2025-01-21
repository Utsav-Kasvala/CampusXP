import express from 'express';
import {createQuiz}  from '../Controllers/QuizController.js'

const router = express.Router();
router.post('/create', createQuiz);

export default router;
