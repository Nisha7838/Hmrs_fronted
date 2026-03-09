import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const addEmployee = (emp) => {
    setEmployees([...employees, emp]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const markAttendance = (record) => {
    setAttendance([...attendance, record]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Employees
              employees={employees}
              addEmployee={addEmployee}
              deleteEmployee={deleteEmployee}
            />
          }
        />

        <Route
          path="/attendance"
          element={
            <Attendance
              employees={employees}
              attendance={attendance}
              markAttendance={markAttendance}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
