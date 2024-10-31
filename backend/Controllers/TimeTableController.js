import TimeTableSch from "../models/TimeTableSch.js";

export const getTimeTable = async (req, res) => {
    const timetable = await TimeTableSch.find();
    res.json(timetable);
}

export const posttimetable = async (req, res) => {
    const newEntry = new TimeTableSch(req.body);
    await newEntry.save();
    res.json(newEntry);
}

export const deleteTimeTable = async (req, res) => {
    await TimeTableSch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
}