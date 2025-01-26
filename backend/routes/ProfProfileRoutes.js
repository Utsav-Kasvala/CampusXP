import express from 'express'
import { getProfProfile, updateProfProfile, uploadProfProfilePic } from '../Controllers/ProfProfileController.js';
import { uploadImg } from '../config/multerConfig.js';

const router=express.Router()

router.get('/:userId',getProfProfile);
router.put('/:userId',updateProfProfile);
router.put('/uploadProfilePic/:userId', uploadImg.single('photo'),uploadProfProfilePic);
  
export default router