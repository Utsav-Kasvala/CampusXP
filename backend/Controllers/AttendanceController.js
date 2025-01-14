import express from "express";
import Attendance from "../models/Attendance.js";
import Classroom from "../models/Classroom.js";
import Student from "../models/Student.js";
export const createattendance=async (req, res) => {
    const { joinCode } = req.params;

    try {
        // Find the classroom by joinCode
        const classroom = await Classroom.findOne({ joinCode });
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found.' });
        }
        // console.log(classroom)
        // Create a new attendance record for the classroom
        const newAttendance = new Attendance({
            joinCode: classroom.joinCode,
            date: new Date(), // Can also be specified in the request body if needed
            students: classroom.students.map(student => ({
                studentId: student.id,
                name: student.name,
                present: false, // Default attendance status
            })),
        });

        //Save the attendance record
        const savedAttendance = await newAttendance.save();
        res.status(201).json({ attendanceId: savedAttendance._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create attendance.' });
    }
};

export const getparticularattendance=async (req, res) => {
    const { attendanceId } = req.params;

    try {
        // Find attendance by ID
        const attendance = await Attendance.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }
       // console.log(attendance);
        res.status(200).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve attendance record.' });
    }
};

export const getattendancefromjoincode=async (req, res) => {
    const { joinCode } = req.params; // Get join code from URL parameters

    try {
        const attendanceRecords = await Attendance.find({ joinCode }); // Find all records with the given join code
        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found for this join code.' });
        }
        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve attendance records.', error: error.message });
    }
};

export const updateAttendance = async (req, res) => {
    const { attendanceId } = req.params;
    const { students } = req.body; // Expect an array of student attendance data
    

    try {
        // Find the attendance record by ID
        const attendance = await Attendance.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }

        // Iterate over the students in the request body
        for (let updatedStudent of students) {
            // Find the student in the attendance record using the studentId (not _id)
            const studentInRecord = attendance.students.find(student => student.studentId === updatedStudent.studentId);
            
            if (studentInRecord) {
                // If the student is present, increase their points
                if (updatedStudent.present === true) {
                    // Find the student in the Student model and update their points
                    
                    const st=await Student.findOneAndUpdate(
                        { studentId: updatedStudent.studentId }, // Find by studentId (UUID)
                        { $inc: { points: 1 } }, // Increment the points field by 1
                    );
                    console.log(st);

                }
                // Update the status in the attendance record
                studentInRecord.present = updatedStudent.present;
            }
        }

        // Save the updated attendance record to the database
        const newAttendance = await attendance.save();
       // console.log(newAttendance);

        res.status(200).json({ message: 'Attendance and points updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update attendance.' });
    }
};

