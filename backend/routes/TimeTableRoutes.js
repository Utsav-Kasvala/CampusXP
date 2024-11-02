import express from 'express'
import { deleteTimeTable, getTimeTable, posttimetable, UpdateTimeTable } from '../Controllers/TimeTableController.js';

const router=express.Router()

router.get('/:userId',getTimeTable);
router.post('/',posttimetable); 
router.put('/:id',UpdateTimeTable);
router.delete('/:id',deleteTimeTable);

  
export default router