import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { authContext } from '../context/AuthContext';

const ClassroomWiseAttendance = () => {
  const { studentId } = useContext(authContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noClasses, setNoClasses] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/classroomwiseattendance`
        );
        const data = response.data.classroomwiseattendance || [];
        if (data.length === 0) {
          setNoClasses(true);
        }
        setAttendanceData(data);
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

  const classes = Object.keys(groupedAttendance);

  return (
    <div className="min-h-screen py-8 flex justify-center items-center">
      {/* Container for class attendance */}
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Class-wise Attendance</h1>

        {/* Display message when no classes are found */}
        {noClasses ? (
          <p className="text-center text-red-500">Classes have not started yet.</p>
        ) : (
          <div className="overflow-x-auto flex gap-6 pb-6 scrollbar-hide">
            {/* Loop through all classes and display each in the same row */}
            {classes.map((classname, index) => {
              const classData = groupedAttendance[classname];
              const pieChartData = generatePieChartData(classData);

              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 shadow rounded-lg flex flex-col items-center w-80 min-w-[320px] max-w-[400px]"
                >
                  <h2 className="text-xl font-semibold mb-6">{classname}</h2>
                  {/* Flex container to center the PieChart */}
                  <div className="flex justify-center items-center w-full h-[350px]">
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
                      width={350}
                      height={350}
                    />
                  </div>
                  <p className="mt-4 text-center">
                    Total Classes: {classData.total} | Present: {classData.present} | Absent: {classData.absent}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomWiseAttendance;
