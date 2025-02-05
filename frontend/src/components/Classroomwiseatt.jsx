import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { authContext } from "../context/AuthContext";

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

        if (data.length === 0) setNoClasses(true);
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchAttendance();
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-4 text-sm">Loading...</div>;
  }

  const groupedAttendance = attendanceData.reduce((acc, record) => {
    const { classname, present } = record;
    if (!classname) return acc;

    if (!acc[classname]) {
      acc[classname] = { total: 0, present: 0, absent: 0 };
    }

    acc[classname].total += 1;
    acc[classname][present ? "present" : "absent"] += 1;

    return acc;
  }, {});

  const classes = Object.keys(groupedAttendance);

  return (
    <div className="w-full flex justify-center">
      {noClasses ? (
        <p className="text-center text-red-500 text-sm">No attendance data available.</p>
      ) : (
        <div
          className={`flex ${
            classes.length === 1 ? "justify-center" : "justify-center gap-4 flex-wrap"
          }`}
        >
          {classes.map((classname, index) => {
            const classData = groupedAttendance[classname];
            const pieChartData = [
              ["Status", "Count"],
              ["Present", classData.present || 0],
              ["Absent", classData.absent || 0],
            ];

            return (
              <div
                key={index}
                className="p-4 bg-gray-50 shadow-md rounded-lg flex flex-col items-center max-w-sm"
              >
                <h2 className="text-lg font-semibold mb-2">{classname}</h2>
                <Chart
                  chartType="PieChart"
                  data={pieChartData}
                  options={{
                    legend: "none",
                    pieSliceText: "label",
                    pieStartAngle: 100,
                  }}
                  width="250px"
                  height="250px"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassroomWiseAttendance;
