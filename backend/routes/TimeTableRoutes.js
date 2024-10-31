import express from 'express'
import { deleteTimeTable, getTimeTable, posttimetable } from '../Controllers/TimeTableController.js';

const router=express.Router()

router.get('/',getTimeTable);
router.post('/',posttimetable); 
router.delete('/:id',deleteTimeTable);
  
export default router