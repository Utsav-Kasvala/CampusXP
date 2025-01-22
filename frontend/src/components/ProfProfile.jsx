import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { BASE_URL, token } from "../config";
import profilepic from "../assets/images/profilepic.png";

const ProfProfile = () => {
  const { user } = useContext(authContext);
  const userId = user.professorId;
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = `${BASE_URL}/profProfile`;

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
        setErrorMessage(errorData.message);
        return;
      }

      setErrorMessage("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-blue-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-700 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-400 via-blue-100 to-blue-200 shadow-xl rounded-lg w-full max-w-4xl flex flex-col sm:flex-row overflow-hidden transform transition duration-500 hover:scale-105">
        {/* Left Section */}
        <div className="w-full sm:w-2/3 p-6 flex-grow space-y-6 text-white">
          <div className="text-left">
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
                <p className="text-lg">Email: {profile.email}</p>
                <p className="text-lg">Phone: {profile.phone}</p>
                <h2 className="text-xl font-semibold mt-4">Subjects Taught:</h2>
                <ul className="list-disc ml-6">
                  {profile.classrooms.map((classroom) => (
                    <li
                      key={classroom.joinCode}
                      className="text-gray-100 font-medium"
                    >
                      {classroom.subjectName} ({classroom.credits} credits)
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transform hover:scale-105 transition duration-300"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 space-y-6">
          <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 border-blue-700 shadow-lg transform hover:rotate-6 transition duration-500">
            <img
              src={profilepic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-blue-900 text-lg font-semibold">Profile Picture</p>
        </div>
      </div>
    </div>
  );
};

export default ProfProfile;
