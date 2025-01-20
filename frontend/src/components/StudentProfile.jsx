import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { BASE_URL, token } from "../config";
import profilepic from '../assets/images/profilepic.png';

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
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const API_URL = `${BASE_URL}/studentProfile`;

  // Fetch user profile data
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
        // Ensure the formData is updated when the profile data is fetched
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
        setErrorMessage(errorData.message); // Set the error message from backend
        return;
      }

      setErrorMessage(""); // Clear any previous error messages
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
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
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 shadow-lg rounded-lg w-full max-w-4xl flex flex-col sm:flex-row">
        {/* Left Section */}
        <div className="w-full sm:w-2/3 p-6 border-r border-gray-200 flex-grow space-y-6 text-white">
          <div className="text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name} // Ensure the input reflects the state
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email} // Ensure the input reflects the state
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
                <input
                  type="number"
                  name="phone"
                  value={formData.phone} // Ensure the input reflects the state
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">{errorMessage}</div> // Display error message
                )}
                <div className="flex justify-between">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-lg">Email: {profile.email}</p>
                <p className="text-lg">Phone: {profile.phone}</p>
                <p className="text-lg">Points: {profile.points}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 p-6 flex flex-col items-center justify-center space-y-6 text-white">
          <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden border-4 border-white">
            <img
              src={`${profilepic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-gray-200 text-sm">Profile Picture</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
