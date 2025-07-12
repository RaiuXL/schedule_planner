import React, { useState, useMemo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/features/employees/EmployeesSchema";

import { employeeColumns } from "./EmployeesColumns";
import EmployeeSheet from "./EmployeeSheet";
import GenericTableBodyRenderer from "@/features/shared/GenericTableBodyRenderer";

import { fetchEmployees, addEmployee, updateEmployee } from "@/services/api";
import { toast } from "sonner";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

const EmployeesTable = ({ data, onEmployeeAdded }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDeleteRefresh = async () => {
    const updated = await fetchEmployees();
    onEmployeeAdded(Array.isArray(updated.employees) ? updated.employees : []);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      roles: [],
      availability: {},
    },
  });

  const resetFormToDefault = () => {
    form.reset({ name: "", roles: [], availability: {} });
  };

  const resetFormToEmployee = (employee) => {
    form.reset({
      name: employee.name,
      roles: employee.roles.split(","),
      availability: employee.availability,
    });
  };

  useEffect(() => {
    editingEmployee ? resetFormToEmployee(editingEmployee) : resetFormToDefault();
  }, [editingEmployee, form]);

  const filteredEmployees = useMemo(
    () =>
      data.filter((emp) =>
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      roles: values.roles.join(","),
      availability: values.availability,
    };

    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, payload);
        toast.success("Employee updated!");
      } else {
        await addEmployee(payload);
        toast.success("Employee added!");
      }

      resetFormToDefault();
      setSheetOpen(false);
      setEditingEmployee(null);

      const updatedData = await fetchEmployees();
      onEmployeeAdded(Array.isArray(updatedData.employees) ? updatedData.employees : []);
    } catch (err) {
      toast.error("Failed to save employee.");
      console.error("Error submitting employee:", err);
    }

  };

  const table = useReactTable({
    data: filteredEmployees,
    columns: employeeColumns(
      handleDeleteRefresh,
      (employee) => {
        setEditingEmployee(employee);
        setSheetOpen(true);
      }
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
          <EmployeeSheet
            isOpen={sheetOpen}
            onOpenChange={(open) => {
              setSheetOpen(open);
              if (!open) setEditingEmployee(null);
            }}
            editingEmployee={editingEmployee}
            onSubmit={onSubmit}
            form={form}
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