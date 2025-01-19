import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import { authContext } from '../context/AuthContext';

const ClassroomWiseAttendance = () => {
  const { studentId } = useContext(authContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Fetch attendance data
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

  // Loading indicator
  const renderLoadingState = () => (
    <div className="flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500"></div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center mt-10">{renderLoadingState()}</div>;
  }

  // Group attendance data by classname
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

  // Generate pie chart data for each class
  const generatePieChartData = (classData) => {
    const { present, absent } = classData;
    return [
      { id: 0, value: present, label: 'Present', color: '#66BB6A' }, // Green for Present
      { id: 1, value: absent, label: 'Absent', color: '#EF5350' }, // Red for Absent
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 mt-20">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Class-wise Attendance</h1>

        {Object.keys(groupedAttendance).length > 0 ? (
          Object.keys(groupedAttendance).map((classname, index) => {
            const classData = groupedAttendance[classname];
            const pieChartData = generatePieChartData(classData);

            return (
              <div key={index} className="my-6 p-6 bg-gray-50 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">{classname}</h2>
                <div className="flex flex-col items-center">
                  <div
                    className="pie-chart-container"
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      height: '300px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <PieChart
                      data={pieChartData}
                      lineWidth={30}
                      segmentsShift={(index) => (index === hoveredSegment ? 5 : 0)}
                      label={({ dataEntry }) =>
                        hoveredSegment === dataEntry.id ? `${dataEntry.label}: ${dataEntry.value}` : ''
                      }
                      labelStyle={{
                        fontSize: '12px',
                        fontFamily: 'Arial, sans-serif',
                        fill: '#fff',
                      }}
                      onMouseOver={(_, index) => setHoveredSegment(index)}
                      onMouseOut={() => setHoveredSegment(null)}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                  <p className="text-gray-700 mt-4 text-center">
                    Total Classes: {classData.total} | Present: {classData.present} | Absent: {classData.absent}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default ClassroomWiseAttendance;
