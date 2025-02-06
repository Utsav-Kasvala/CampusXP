import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendancePage = () => {
    const { joinCode } = useParams();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [studentsAttendance, setStudentsAttendance] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance/joinCode/${joinCode}`);
                setAttendanceRecords(response.data.attendance);
                setFilteredRecords(response.data.attendance);
                calculateStudentAttendance(response.data.attendance);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch attendance data.');
            }
        };
        fetchAttendance();
    }, [joinCode]);

    const calculateStudentAttendance = (records) => {
        const studentStats = {};
        records.forEach((record) => {
            record.students.forEach((student) => {
                if (!studentStats[student.studentId]) {
                    studentStats[student.studentId] = {
                        name: student.name,
                        present: 0,
                        absent: 0,
                        total: 0,
                    };
                }
                studentStats[student.studentId].total++;
                studentStats[student.studentId][student.present ? 'present' : 'absent']++;
            });
        });
        setStudentsAttendance(Object.values(studentStats));
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);
        setFilteredRecords(
            selectedDate ? attendanceRecords.filter(record => new Date(record.date).toISOString().split('T')[0] === selectedDate) : attendanceRecords
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-1/4 bg-white shadow-lg p-6 h-screen overflow-y-auto mt-20 rounded-lg border-r border-gray-200">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Class Attendance</h2>
                <ul className="divide-y divide-gray-200">
                    {studentsAttendance.map((student) => (
                        <li key={student.name} className="p-4 hover:bg-gray-50 rounded-lg">
                            <p className="text-gray-900 font-semibold">{student.name}</p>
                            <p className="text-sm text-green-600">✅ Present: {student.present}</p>
                            <p className="text-sm text-red-600">❌ Absent: {student.absent}</p>
                            <p className="text-sm text-gray-700">📊 Total: {student.total}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 flex flex-col items-center py-8 mt-20">
                <h1 className="text-3xl font-extrabold text-blue-600 mb-6">Attendance Records</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <label className="block text-gray-800 font-bold mb-2" htmlFor="filter-date">Filter by Date:</label>
                    <input type="date" id="filter-date" value={filterDate} onChange={handleDateChange} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200" />
                </div>
                {filterDate === '' ? (
                    <p className="text-gray-600">Select a date to filter attendance records.</p>
                ) : filteredRecords.length > 0 ? (
                    <ul className="space-y-6 w-full max-w-3xl">
                        {filteredRecords.map((record) => (
                            <li key={record._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
                                <h3 className="text-lg font-bold text-gray-900">📅 {new Date(record.date).toLocaleDateString()}</h3>
                                <ul className="mt-4 space-y-2">
                                    {record.students.map((student) => (
                                        <li key={student.studentId} className="flex justify-between p-3 rounded-md bg-gray-50 shadow">
                                            <span className="text-gray-900 font-medium">{student.name}</span>
                                            <span className={`${student.present ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                                {student.present ? '✅ Present' : '❌ Absent'}
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
        </div>
    );
};

export default AttendancePage;
