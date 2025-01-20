import Student from "../models/Student.js";


export const getStudentProfile = async (req, res) => {
    const { userId } = req.params;
    //console.log(userId);
    try {
      const profile = await Student.findOne({ studentId: userId }); 
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

export const updateStudentProfile =async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body; // Only allow name and email updates
   // console.log(name,email);
    //console.log(req.params);
  
    try {
      const updatedProfile = await Student.findOneAndUpdate(
        {studentId: userId },
        { name, email }, // Exclude `points` from updates
        { new: true, runValidators: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }