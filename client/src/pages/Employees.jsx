// External Libaries
import React, { useState, useEffect } from "react";
// App-specific
import { fetchEmployees } from "@/services/api";
// file import
import EmployeesTable from "@/features/employees/EmployeesTable";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(Array.isArray(data.employees) ? data.employees : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <EmployeesTable data={employees} onEmployeeAdded={setEmployees} />
    </div >
  );

};

export default Employees;