import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { authContext } from '../context/AuthContext';

const ClassroomWiseAttendance = () => {
  const { studentId } = useContext(authContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noClasses, setNoClasses] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!studentId) {
        console.warn('Student ID is undefined. Cannot fetch attendance.');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching attendance for Student ID: ${studentId}`);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/classroomwiseattendance`
        );
        console.log('Attendance Data:', response.data);

        const data = response.data.classroomwiseattendance || [];
        setNoClasses(data.length === 0);
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (noClasses) {
    return <p className="text-center text-red-500">Classes have not started yet.</p>;
  }

  const groupedAttendance = attendanceData.reduce((acc, record) => {
    const { classname, present } = record;
    if (!acc[classname]) {
      acc[classname] = { total: 0, present: 0, absent: 0 };
    }

    acc[classname].total += 1;
    acc[classname][present ? 'present' : 'absent'] += 1;
    return acc;
  }, {});

  const generatePieChartData = (classData) => {
    const pieData = [
      { id: "Present", value: classData.present, color: "#4caf50" },
      { id: "Absent", value: classData.absent, color: "#f44336" }
    ];
  
    console.log("📊 Pie Chart Data:", pieData);
    return pieData;
  };

  return (
    <div className="min-h-screen py-8 flex justify-center items-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Class-wise Attendance</h1>
        <div className="overflow-x-auto flex gap-6 pb-6 scrollbar-hide">
          {Object.keys(groupedAttendance).map((classname, index) => {
            const classData = groupedAttendance[classname];
            return (
              <div key={index} className="p-6 bg-gray-50 shadow rounded-lg flex flex-col items-center w-80">
                <h2 className="text-xl font-semibold mb-6">{classname}</h2>
                <PieChart
                  series={[{ data: generatePieChartData(classData), innerRadius: 50, outerRadius: 120 }]}
                  width={350}
                  height={350}
                />
                <p className="mt-4 text-center">
                  Total: {classData.total} | Present: {classData.present} | Absent: {classData.absent}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassroomWiseAttendance;
