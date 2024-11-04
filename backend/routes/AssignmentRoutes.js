import express from 'express';
import { getAssignmentsByStudent,submitAssignment,getAssignmentSubmissions } from '../Controllers/AssignmentController.js'
import { upload } from '../config/multerConfig.js';
const router = express.Router();
router.get('/student/:studentId', getAssignmentsByStudent);
router.post('/:assignmentId/submit', upload.single('file'), submitAssignment);
router.get('/:assignmentId/submissions', getAssignmentSubmissions);
export default router;
