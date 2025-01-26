import Student from "../models/Student.js";
import cloudinary from "../config/cloudinaryConfig.js";

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

export const uploadProfilePic = async (req, res) => {
  const { userId } = req.params;
  const file = req.file; // File uploaded through multer
  //console.log(userId);
  //console.log(req.file)

  try {
      const student = await Student.findOne({studentId: userId});

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      
      
      // Check if an image was uploaded
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded. Please upload an image.' });
      }

      // Upload file to Cloudinary if file exists
              let fileUrl = null;
              if (file) {
                  const result = await cloudinary.uploader.upload(file.path, {
                      resource_type: 'raw', // Use 'raw' for documents like PDFs
                      folder: 'profilepics' // Optional: specify folder on Cloudinary
                  });
                  fileUrl = result.secure_url; // Cloudinary's file URL
              }
      // Update the photo URL in the schema
      student.photo = fileUrl; // Cloudinary URL
      //console.log(student.photo);
      await student.save();

      res.status(200).json({ message: 'Profile picture updated successfully', photo: student.photo });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
