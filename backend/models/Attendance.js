import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, // Date of the attendance session
    joinCode: { type: String },
    students: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student"},
            name: { type: String },
            present: { type: Boolean, default: false } // Track presence status
        }
    ]
});

// Method to mark attendance for a specific student
attendanceSchema.methods.markAttendance = async function (studentId, status) {
    const student = this.students.find(s => s.studentId.toString() === studentId.toString());
    if (student) {
        student.isPresent = status;
        await this.save();
    }
};

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
