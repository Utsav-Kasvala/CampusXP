import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { BASE_URL, token } from '../config';
import { FaTrash } from 'react-icons/fa';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
const API_URL = `${BASE_URL}/timeTable`;
// const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

function Timetable() {
  const [entries, setEntries] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newEntry, setNewEntry] = useState('');
  const { user } = useContext(authContext);
  const userId = user.studentId;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }

        const data = await response.json();

        // Format entries to be easy to access
        const formattedEntries = data.reduce((acc, item) => {
          acc[`${item.day}-${item.time}`] = { entry: item.entry, id: item._id }; // Assuming _id is the identifier
          return acc;
        }, {});
        setEntries(formattedEntries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, [userId]); // Re-fetch when user.studentId changes

  const handleCellClick = (day, time) => setSelectedSlot({ day, time });

  const handleEntrySubmit = async () => {
    if (selectedSlot && newEntry) {
      const { day, time } = selectedSlot;
      const entryId = entries[`${day}-${time}`]?.id;
      const method = entryId ? 'PUT' : 'POST';
      const url = entryId ? `${API_URL}/${entryId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, time, entry: newEntry, userId }),
      });

      if (response.ok) {
        const savedEntry = await response.json();
        setEntries(prev => ({
          ...prev,
          [`${day}-${time}`]: { entry: savedEntry.entry, id: savedEntry._id },
        }));
        setNewEntry('');
        setSelectedSlot(null);
      } else {
        console.error('Failed to save entry');
      }
    }
  };

  const handleDeleteEntry = async (day, time) => {
    const entryId = entries[`${day}-${time}`]?.id;
    if (!entryId) return;

    const response = await fetch(`${API_URL}/${entryId}`, { method: 'DELETE' });
    if (response.ok) {
      setEntries(prev => {
        const updated = { ...prev };
        delete updated[`${day}-${time}`];
        return updated;
      });
    } else {
      console.error('Failed to delete entry');
    }
  };

  return (
    <div className="p-8 m-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Weekly Timetable</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-blue-200 text-gray-800 font-semibold"></th>
              {timeSlots.map((time, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2 bg-blue-200 text-gray-800 font-semibold text-center">
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className="bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center bg-blue-50 text-gray-700">
                  {day}
                </td>
                {timeSlots.map(time => (
                  <td
                    key={`${day}-${time}`}
                    className="border border-gray-300 px-4 py-2 text-center cursor-pointer relative group"
                    onClick={() => handleCellClick(day, time)}
                  >
                    {entries[`${day}-${time}`]?.entry || ""}
                    {entries[`${day}-${time}`] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent cell click
                          handleDeleteEntry(day, time);
                        }}
                        className="absolute right-1 top-1 text-red-600 hover:text-red-800 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Entry Form */}
      {selectedSlot && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg w-full max-w-md mx-auto shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Add Entry for {selectedSlot.day} at {selectedSlot.time}
          </h2>
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject or activity"
          />
          <button
            onClick={handleEntrySubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          >
            Add Entry
          </button>
        </div>
      )}
    </div>
  );
}

export default Timetable;
