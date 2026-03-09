import { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";

export default function Employees({ addEmployee }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Employee
      </button>

      {open && (
        <AddEmployeeModal
          addEmployee={addEmployee}
          closeModal={() => setOpen(false)}
        />
      )}
    </div>
  );
}
