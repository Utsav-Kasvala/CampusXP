import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: String, required: true }
});

export default mongoose.model("TimeTableSch", timetableSchema);