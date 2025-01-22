import express from 'express'
import { getProfProfile, updateProfProfile } from '../Controllers/ProfProfileController.js';

const router=express.Router()

router.get('/:userId',getProfProfile);
router.put('/:userId',updateProfProfile);
  
export default router