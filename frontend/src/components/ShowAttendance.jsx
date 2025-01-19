import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendancePage = () => {
    const { joinCode } = useParams();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance/joinCode/${joinCode}`);
                setAttendanceRecords(response.data.attendance);
                setFilteredRecords(response.data.attendance); // Initialize filtered records
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch attendance data.');
            }
        };

        fetchAttendance();
    }, [joinCode]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);

        if (selectedDate) {
            const filtered = attendanceRecords.filter((record) =>
                new Date(record.date).toISOString().split('T')[0] === selectedDate
            );
            setFilteredRecords(filtered);
        } else {
            setFilteredRecords(attendanceRecords);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 mt-20">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Attendance Records for Join Code: {joinCode}
            </h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="filter-date">
                    Filter by Date:
                </label>
                <input
                    type="date"
                    id="filter-date"
                    value={filterDate}
                    onChange={handleDateChange}
                    className="p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {filterDate === '' ? (
                <p className="text-gray-600">Select a date to filter attendance records.</p>
            ) : filteredRecords.length > 0 ? (
                <ul className="space-y-6 w-full max-w-3xl">
                    {filteredRecords.map((record) => (
                        <li key={record._id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Attendance Date: {new Date(record.date).toLocaleDateString()}
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {record.students.map((student) => (
                                    <li
                                        key={student.studentId}
                                        className="flex justify-between p-2 rounded-md bg-gray-50"
                                    >
                                        <span className="text-gray-700">{student.name}</span>
                                        <span
                                            className={`${
                                                student.present ? 'text-green-600' : 'text-red-600'
                                            } font-medium`}
                                        >
                                            {student.present ? 'Present' : 'Absent'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No attendance records found for the selected date.</p>
            )}
        </div>
    );
};

export default AttendancePage;
