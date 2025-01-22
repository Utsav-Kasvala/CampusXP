import express from 'express'
import { forgorpassfunc, resetpassfunc } from '../Controllers/ResetPasswordContoller.js'


const router=express.Router()

router.post('forgot-password',forgorpassfunc);
router.put('/reset-password/:token',resetpassfunc);
  
export default router