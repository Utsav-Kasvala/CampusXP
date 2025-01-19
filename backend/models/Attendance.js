import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, // Date of the attendance session
    joinCode: { type: String },
    subjectName:{ type: String },
    students: [
        {
            studentId: { type: String, required: true},
            name: { type: String },
            present: { type: Boolean, default: false } // Track presence status
        }
    ]
});


attendanceSchema.methods.markAttendance = async function (studentId, status) {
    const student = this.students.find(s => s.studentId.toString() === studentId.toString());
    if (student) {
        student.isPresent = status;
        await this.save();
    }
};

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
