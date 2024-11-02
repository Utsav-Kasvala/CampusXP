import TimeTableSch from "../models/TimeTableSch.js";

export const getTimeTable = async (req, res) => {
  try {
    const timetable = await TimeTableSch.find({ userId: req.params.userId });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const posttimetable = async (req, res) => {
  const { day, time, entry, userId } = req.body;
  const newEntry = new TimeTableSch({ day, time, entry, userId });
  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const UpdateTimeTable = async (req, res) => {
  try {
    const updatedEntry = await TimeTableSch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const deleteTimeTable = async (req, res) => {
  try {
    await TimeTableSch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}