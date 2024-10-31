import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';

function TimeTable() {
  const [timetable, setTimetable] = useState([]);
  const [newEntry, setNewEntry] = useState({ day: '', subject: '', time: '' });

  // Fetch timetable data on component mount
  // {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  useEffect(() => {
    axios.get(`${BASE_URL}/timeTable`).then((res) => setTimetable(res.data));
  }, []);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/timeTable`, newEntry);
    setTimetable([...timetable, res.data]);
    setNewEntry({ day: '', subject: '', time: '' }); // Reset form
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/timeTable/${id}`);
    setTimetable(timetable.filter((entry) => entry._id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6">
      {/* Form to Add New Entry */}
      <div className="flex-1 bg-white p-6 shadow-md rounded-lg mr-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Timetable Manager</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="day"
            placeholder="Day"
            value={newEntry.day}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newEntry.subject}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="time"
            placeholder="Time"
            value={newEntry.time}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Entry
          </button>
        </form>
      </div>

      {/* Timetable Display */}
      <div className="flex-1 max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Weekly Timetable</h1>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Day</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((entry, index) => (
              <tr
                key={entry._id} // Use the unique ID as the key
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-200`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">{entry.day}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{entry.subject}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{entry.time}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeTable;