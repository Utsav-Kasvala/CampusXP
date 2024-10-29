import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    role: {
      type: String,
    },
  
});

export default mongoose.model("Professor", ProfessorSchema);
