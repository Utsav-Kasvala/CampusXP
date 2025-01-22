import Professor from "../models/Professor.js";

export const getProfProfile = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the professor and populate classrooms with specific fields
      const profile = await Professor.findOne({ professorId: userId })
        .populate("classrooms", "subjectName credits joinCode") // Populate only required fields
        .exec();
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      console.log(profile)
      // Return the profile along with populated classrooms
      res.json({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        classrooms: profile.classrooms, // Include the populated classrooms
      });
    } catch (error) {
      console.error("Error fetching professor profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

export const updateProfProfile = async (req, res) => {
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
    const updatedProfile = await Professor.findOneAndUpdate(
      { professorId: userId },
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
