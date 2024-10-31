import express from 'express';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Import the Student model
import { v4 as uuidv4 } from 'uuid';
import Professor from '../models/Professor.js';
import {create,CreatedClass,join,asyncHandler,Default,joined} from '../Controllers/ClassRoomController.js';
const router = express.Router();


router.post('/create', create);
router.get('/professor/:professorId/classes', CreatedClass);
router.post('/join',join);
router.get("/joined/:studentId", joined);
router.get('/', Default);

export default router;
