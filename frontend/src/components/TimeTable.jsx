import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { BASE_URL, token } from '../config';
import { FaTrash } from 'react-icons/fa';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
const API_URL = `${BASE_URL}/timeTable`;

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

        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }

        const data = await response.json();

        const formattedEntries = data.reduce((acc, item) => {
          acc[`${item.day}-${item.time}`] = { entry: item.entry, id: item._id };
          return acc;
        }, {});
        setEntries(formattedEntries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, [userId]);

  const handleCellClick = (day, time) => {
    setSelectedSlot({ day, time });
    setNewEntry(entries[`${day}-${time}`]?.entry || '');
  };

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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-purple-200 to-blue-600 flex flex-col items-center p-6 mt-16">
      {/* Hover effect applied here */}
      <div className="p-8 m-16 bg-gradient-to-r backdrop-blur-lg bg-opacity-50 rounded-xl shadow-lg w-full max-w-5xl hover:bg-purple-200 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Weekly Timetable</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="border-4 border-gray-700 px-4 py-3 bg-yellow-200 text-gray-800 font-semibold text-lg"></th>
                {timeSlots.map((time, i) => (
                  <th key={i} className="border-4 border-gray-700 px-4 py-3 bg-yellow-200 text-gray-800 font-semibold text-center text-base">
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="bg-white hover:bg-gray-100">
                  <td className="border-4 border-gray-700 px-4 py-3 font-semibold text-center bg-yellow-200 text-gray-700 text-base">
                    {day}
                  </td>
                  {timeSlots.map(time => {
                    const isSelected = selectedSlot?.day === day && selectedSlot?.time === time;

                    return (
                      <td
                        key={`${day}-${time}`}
                        className={`border-4 border-gray-700 px-4 py-3 text-center cursor-pointer relative group transition-all ${isSelected ? "bg-blue-300" : "bg-red-100 hover:bg-gray-200"
                          }`}
                        onClick={() => handleCellClick(day, time)}
                      >
                        {entries[`${day}-${time}`]?.entry || ""}
                        {entries[`${day}-${time}`] && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent cell click
                              handleDeleteEntry(day, time);
                            }}
                            className="absolute right-2 top-2 text-red-600 hover:text-red-800 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Entry Form */}
        {selectedSlot && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg w-full max-w-md mx-auto shadow-md relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSlot(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition text-2xl"
            >
              &times;
            </button>

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
    </div>
  );
}

export default Timetable;
