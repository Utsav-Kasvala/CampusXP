import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { BASE_URL, token } from "../config";
import defaultProfilePic from "../assets/images/profilepic.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
  const { user } = useContext(authContext);
  const userId = user.studentId;

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = `${BASE_URL}/studentProfile`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
        setProfilePic(data.photo || defaultProfilePic);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", imageFile);

    try {
      const response = await fetch(`${API_URL}/uploadProfilePic/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      const data = await response.json();
      if (data.photo) {
        setProfilePic(data.photo);
        toast.success("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }

      setErrorMessage("");
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-700 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-400 via-blue-100 to-blue-200 shadow-xl rounded-lg w-full max-w-4xl flex flex-col sm:flex-row overflow-hidden transform transition duration-500 hover:scale-105">
        {/* Left Section */}
        <div className="w-full sm:w-2/3 p-6">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errorMessage && (
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transform hover:scale-110 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transform hover:scale-110 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p>
              <p>Points: {profile.points}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transform hover:scale-105 transition duration-300"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 p-6 flex flex-col items-center">
          <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 shadow-lg transform hover:rotate-6 transition duration-500">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="mt-4"
            onChange={handleImageChange}
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition duration-300"
          >
            Upload
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default StudentProfile;
