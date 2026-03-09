import { useEffect, useState } from "react";
import api from "../api/axios";
import { FullScreenLoader } from "./FullScreenLoader";
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees/");
      setEmployees(res.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);

      setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
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
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>

      {employees.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Add employee to show here...
        </div>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, ind) => (
              <tr key={emp.employee_id} className="text-center border-t">
                <td className="p-2">{ind + 1}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>

                <td>
                  <button
                    onClick={() => deleteEmployee(emp.employee_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
