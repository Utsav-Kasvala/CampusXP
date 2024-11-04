
import Student from "../models/Student.js";
// Fetch the leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        // Fetch students and sort by points in descending order
        const students = await Student.find({})
            .sort({ points: -1 }) // Assuming you have a 'points' field
            .limit(10); // Limit to top 10 students

        res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: 'Failed to fetch leaderboard data.' });
    }
};
