import express from 'express';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Import the Student model
import { v4 as uuidv4 } from 'uuid';
import Professor from '../models/Professor.js';
import { upload } from '../config/multerConfig.js';

import Assignment from '../models/Assignment.js'
import {create,CreatedClass,join,asyncHandler,Default,joined, createAssignment,getAssignmentsByClassroomJoinCode,getStudentsByJoinCode,getClassroomByJoinCode, addNotification, getProfessorDashboard} from '../Controllers/ClassRoomController.js';
const router = express.Router();

router.post('/:joinCode/assignment', upload.single('file'), createAssignment);
//router.post('/:joinCode/assignment', createAssignment);
router.get("/dashboard/:professorId",getProfessorDashboard);
router.post('/create', create);
router.get('/professor/:professorId/classes', CreatedClass);
router.post('/join',join);
router.get("/joined/:studentId", joined);
router.get("/students/:joinCode", getStudentsByJoinCode);
router.get('/', Default);
router.get('/join-code/:joinCode', getClassroomByJoinCode);
router.get('/viewAssignment/:joinCode',getAssignmentsByClassroomJoinCode);
router.post('/postnotification/:classroomId',addNotification)
export default router;
