import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  day: { type: String },
  time: { type: String },
  entry: { type: String},
  userId: {type: String}  // To link entries with specific users
});

export default mongoose.model("TimeTableSch", timetableSchema);