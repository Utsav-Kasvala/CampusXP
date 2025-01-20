import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { authContext } from '../context/AuthContext';

const ClassroomWiseAttendance = () => {
  const { studentId } = useContext(authContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/classroomwiseattendance`
        );
        setAttendanceData(response.data.classroomwiseattendance || []);
      } catch (error) {
        console.error('Error fetching attendance data:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAttendance();
    }
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const groupedAttendance = attendanceData.reduce((acc, record) => {
    const { classname, present } = record;

    if (!acc[classname]) {
      acc[classname] = { total: 0, present: 0, absent: 0 };
    }

    acc[classname].total += 1;
    if (present) {
      acc[classname].present += 1;
    } else {
      acc[classname].absent += 1;
    }

    return acc;
  }, {});

  const generatePieChartData = (classData) => [
    {
      id: 'Present',
      value: classData.present,
      color: '#4caf50',
    },
    {
      id: 'Absent',
      value: classData.absent,
      color: '#f44336',
    },
  ];

  const formatLabel = (item) => `${item.id}: ${item.value}`;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Class-wise Attendance</h1>
        {Object.keys(groupedAttendance).map((classname, index) => {
          const classData = groupedAttendance[classname];
          const pieChartData = generatePieChartData(classData);

          return (
            <div key={index} className="mb-6 p-4 bg-gray-50 shadow rounded">
              <h2 className="text-xl font-semibold mb-4">{classname}</h2>
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    arcLabel: formatLabel,
                    arcLabelMinAngle: 35,
                    arcLabelRadius: '60%',
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                  },
                }}
                width={400}
                height={200}
              />
              <p className="mt-4 text-center">
                Total Classes: {classData.total} | Present: {classData.present} | Absent: {classData.absent}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassroomWiseAttendance;
