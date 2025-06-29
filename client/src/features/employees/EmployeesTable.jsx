import React, { useState, useMemo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/features/employees/EmployeesSchema";

import { roles, shifts, daysInWeek } from "@/features/employees/EmployeesConstants";
import EmployeeForm from "@/features/employees/EmployeesForm";
import { employeeColumns } from "./EmployeesColumns";

import { fetchEmployees, addEmployee, updateEmployee } from "@/services/api";
import { toast } from "sonner";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const EmployeesTable = ({ data, onEmployeeAdded }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false)
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

  useEffect(() => {
    if (editingEmployee) {
      form.reset({
        name: editingEmployee.name,
        roles: editingEmployee.roles.split(","),
        availability: editingEmployee.availability,
      });
    } else {
      form.reset({ name: "", roles: [], availability: {} });
    }
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

      form.reset();
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
        setEditingEmployee(employee);     // sets data to prefill
        setSheetOpen(true);              // opens the form
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

          <Sheet open={sheetOpen} onOpenChange={(open) => {
            setSheetOpen(open);
            if (!open) setEditingEmployee(null);
          }}>
            <SheetTrigger asChild>
              <Button className="bg-success text-success-foreground hover:bg-success/80">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-custom shadow-md">
              <SheetHeader>
                <SheetTitle>{editingEmployee ? "Edit employee" : "Add a new employee"}</SheetTitle>
                <SheetDescription>
                  Fill in the details and click "Submit" to {editingEmployee ? "update" : "add"} them.
                </SheetDescription>
              </SheetHeader>
              <EmployeeForm
                form={form}
                onSubmit={onSubmit}
                roles={roles}
                shifts={shifts}
                daysInWeek={daysInWeek}
              />
            </SheetContent>
          </Sheet>

        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[650px] overflow-y-auto border rounded-md">
          <table className="min-w-full table-auto">
            <thead className="bg-background sticky top-0 z-10">
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id} className="border-b">
                  {group.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left font-medium bg-background"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="even:bg-muted border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={table.getAllColumns().length} className="text-center py-6">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;