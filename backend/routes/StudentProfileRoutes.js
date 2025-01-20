import express from 'express'
import { getStudentProfile, updateStudentProfile } from '../Controllers/StudentProfileController.js';

const router=express.Router()

router.get('/:userId',getStudentProfile);
router.put('/:userId',updateStudentProfile);
  
export default router