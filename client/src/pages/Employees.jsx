import { useState, useEffect } from "react";
import { fetchEmployees } from "@/services/api";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchEmployees();
        setEmployees(Array.isArray(data.employees) ? data.employees : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
        <div>
            <h1 className="text-2xl font-bold">Employees</h1>
            <p>View and manage employees here.</p>
        </div>
      <input
        type="text"
        placeholder="Search employees..."
        className="border px-4 py-2 rounded w-full mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <p>Loading employees...</p>
      ) : filteredEmployees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{employee.id}</td>
                  <td className="border px-4 py-2">{employee.employee_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-red-500">No employees found.</p>
      )}
    </div>
  );
};

export default Employees;