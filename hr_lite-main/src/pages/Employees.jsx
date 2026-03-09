import { Link } from "react-router-dom";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";

export default function Employees({ addEmployee }) {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>

        <Link
          to="/attendance"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Go To Attendance
        </Link>
      </div>

      <div className="grid gap-8">
        <AddEmployee addEmployee={addEmployee} />

        <EmployeeList />
      </div>
    </div>
  );
}
