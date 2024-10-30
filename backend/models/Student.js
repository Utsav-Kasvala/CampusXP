import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique studentId

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, default: uuidv4 }, // Unique student identifier
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }], // Array to store classroom IDs
});

// Set a pre-save hook to assign a unique studentId if it doesn’t already exist
StudentSchema.pre("save", function (next) {
  if (!this.studentId) {
    this.studentId = uuidv4();
  }
  next();
});

export default mongoose.model("Student", StudentSchema);
