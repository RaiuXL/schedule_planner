import React, { useState, useMemo } from "react";
import { employeeColumns } from "./EmployeesColumns";
import GenericTableBodyRenderer from "@/features/shared/GenericTableBodyRenderer";
import { fetchEmployees } from "@/services/api";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import CreateEmployeeSheetForm from "./CreateEmployeeSheetForm";

const EmployeesTable = ({ data, onEmployeeAdded }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDeleteRefresh = async () => {
    const updated = await fetchEmployees();
    onEmployeeAdded(Array.isArray(updated.employees) ? updated.employees : []);
  };

  const filteredEmployees = useMemo(
    () =>
      data.filter((emp) =>
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const table = useReactTable({
    data: filteredEmployees,
    columns: employeeColumns(
      handleDeleteRefresh,
      (employee) => setEditingEmployee(employee)
    ),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-muted-foreground">View and manage employees here.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm w-full md:w-auto"
          />
          <CreateEmployeeSheetForm
            editingEmployee={editingEmployee}
            setEditingEmployee={setEditingEmployee}
            onEmployeeAdded={onEmployeeAdded}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-[650px] overflow-y-auto border rounded-md">
          <GenericTableBodyRenderer
            table={table}
            filteredData={filteredEmployees}
            emptyMessage="No employees found."
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;