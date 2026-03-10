import { useState, useEffect } from "react";
import api from "../api/axios";
import { FullScreenLoader } from "./FullScreenLoader";
export default function Attendance() {
  const [record, setRecord] = useState({
    empId: "",
    date: "",
    status: true,
  });
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, Setloading] = useState(false);
  const fetchEmployees = async () => {
    Setloading(true);
    try {
      const res = await api.get("/employees/");
      setEmployees(res.data.data);
      console.log(res.data.data);
      Setloading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      Setloading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setloading(true);
    const payload = {
      employee_id: Number(record.empId),
      date: record.date,
      status: record.status,
    };

    try {
      const res = await api.post("/attendance/", payload);

      console.log("Attendance saved:", res.data);
      Setloading(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
    } finally {
      Setloading(false);
    }
  };

  const handleView = async () => {
    Setloading(true);
    try {
      const res = await api.get(`/attendance/${record.empId}`);
      console.log(res?.data?.data);
      setAttendance(res?.data?.data);
      Setloading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      Setloading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <select
          className="w-full border p-2 rounded"
          value={record.empId}   // <--- make it controlled
          onChange={(e) =>
            setRecord({
              ...record,
              empId: Number(e.target.value),
            })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.employee_id} value={e.employee_id}>
              {e.full_name}
            </option>
          ))}
        </select>
        <input
          className="w-full border p-2 rounded"
          type="date"
          onChange={(e) => setRecord({ ...record, date: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setRecord({ ...record, status: e.target.value === "true" })
          }
        >
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>

        <button
          type="submit"
          className=" bg-green-600 text-white p-2 rounded hover:bg-green-700 w-fit cursor-pointer"
        >
          Mark Attendance
        </button>
        <button
          type="button"
          onClick={handleView}
          className=" bg-blue-600 ml-4 text-white p-2 rounded hover:bg-blue-700 w-fit cursor-pointer"
        >
          View Attendance
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>

        {attendance.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No attendance records yet
          </div>
        ) : (
          <div className="space-y-3">
            {attendance.map((a, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Name: {a.employee_full_name}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm">{a.date}</div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${a.status === true
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {a.status === true ? "Present" : "Absent"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
