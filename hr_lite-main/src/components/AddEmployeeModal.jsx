import { useState } from "react";
import api from "../api/axios";
import { FullScreenLoader } from "./FullScreenLoader";
export default function AddEmployeeModal({ addEmployee, closeModal }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.department.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      full_name: form.name,
      email: form.email,
      department: form.department,
    };

    try {
      setLoading(true);

      const res = await api.post("/employees", payload);
      console.log(res);

      const employee = {
        id: Date.now(),
        ...form,
      };

      addEmployee(employee);
      closeModal();

      setForm({
        name: "",
        email: "",
        department: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      {loading ? (
        <FullScreenLoader />
      ) : (
        <div className="bg-white w-[400px] rounded-xl shadow-xl p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Add Employee</h2>

            <button
              onClick={closeModal}
              className="text-gray-500 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>

            <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">
              Add Employee
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
