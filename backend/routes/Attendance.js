import express from "express";

import { createattendance, getattendancefromjoincode, getparticularattendance, updateAttendance } from "../Controllers/AttendanceController.js";

const router = express.Router();

router.post("/create/:joinCode",createattendance);
router.get("/:attendanceId",getparticularattendance);
router.get("/joinCode/:joinCode",getattendancefromjoincode);
router.patch("/update/:attendanceId", updateAttendance);

export default router;
