import { Link } from "react-router-dom";
import AttendanceComponent from "../components/Attendance";

export default function Attendance({ employees, attendance, markAttendance }) {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Attendance</h1>

        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Employees
        </Link>
      </div>

      <AttendanceComponent
        employees={employees}
        attendance={attendance}
        markAttendance={markAttendance}
      />
    </div>
  );
}
