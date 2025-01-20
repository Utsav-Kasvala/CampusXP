import Student from "../models/Student.js";

export const getStudentProfile = async (req, res) => {
  const { userId } = req.params;
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
};

export const updateStudentProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone } = req.body;

  // Validate phone number (should be 10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }

  // Validate email (should contain @gmail.com)
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must be a Gmail address" });
  }

  try {
    const updatedProfile = await Student.findOneAndUpdate(
      { studentId: userId },
      { name, email, phone }, // Exclude `points` from updates
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
};
