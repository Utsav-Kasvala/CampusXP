import express from 'express'
import { getStudentProfile, updateStudentProfile, uploadProfilePic } from '../Controllers/StudentProfileController.js';
import { uploadImg } from '../config/multerConfig.js';

const router=express.Router()

router.get('/:userId',getStudentProfile);
router.put('/:userId',updateStudentProfile);
router.put('/uploadProfilePic/:userId', uploadImg.single('photo'),uploadProfilePic);
  
export default router