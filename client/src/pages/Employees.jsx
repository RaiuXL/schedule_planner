import { useState } from "react";
import { Button } from "@/components/ui/button";

const Employees = () => {
  // Sample employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Med Tech" },
    { id: 2, name: "Jane Smith", role: "Aide" },
    { id: 3, name: "Alice Johnson", role: "Security" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      <input
        type="text"
        placeholder="Search employees..."
        className="border px-4 py-2 rounded w-full mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{employee.id}</td>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Button */}
      <div className="mt-4">
        <Button>Add Employee</Button>
      </div>
    </div>
  );
};

export default Employees;