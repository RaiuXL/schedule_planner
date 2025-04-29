import React, { useState, useEffect, useMemo } from "react";
import { fetchEmployees } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"


const AddEmployeeSheet = ({ onEmployeeeAdded }) => {
  const [open, setOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  // Define your available roles and days
  const roles = ["Manager", "Med Tech", "Aide", "Security"];

  const daysInWeek = [
    { label: "Sun", value: "Sunday" },
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "Th", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleDay = (dayValue) => {
    setSelectedDays((prev) =>
      prev.includes(dayValue) ? prev.filter((d) => d !== dayValue) : [...prev, dayValue]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build payload
    const payload = {
      employee_name: employeeName,
      roles: selectedRoles,
      availability: selectedDays,
    };

    try {
      // Make your API POST call here (using fetch or axios)
      // Example:
      // await fetch("/api/employees", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      console.log("New employee payload:", payload);
      // Reset form and close sheet
      setEmployeeName("");
      setSelectedRoles([]);
      setSelectedDays([]);
      setOpen(false);
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

}

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [columnVisibility, setColumnVisibility] = useState({});

  // At the top of your Employees.jsx file, before you use it:
  const daysInWeek = [
    { label: "Sun", value: "Sunday" },
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "Th", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

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

  // Filter employees based on the search query
  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) =>
        employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [employees, searchQuery]
  );

  // Define columns for the table
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "employee_name", header: "Name" },
      { accessorKey: "roles", header: "Roles" },
      { accessorKey: "availability", header: "Availability" },
    ],
    []
  );

  // Initialize the table with column visibility state
  const table = useReactTable({
    data: filteredEmployees,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">

        <div className="mb-4">
          <h1 className="text-2xl font-bold">Employees</h1>
          <p>View and manage employees here.</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded flex-1"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllColumns().filter(column => column.getCanHide()).map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-success text-success-foreground hover:bg-success/80 dark:hover:bg-success/80 dark:bg-success dark:text-success-foreground">Add Employee</Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-custom shadow-md">
              <SheetHeader>
                <SheetTitle>Add a new employee</SheetTitle>
                <SheetDescription>
                  Here you can provide their information and be listed. Click save to finish and create a new instance of an employee.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-5 px-5 py-4">

                <div className="grid grid-cols-4 gap-2">
                  <Label htmlFor="name" className="text-right col-span-1">Name</Label>
                  <Input id="name" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <Label htmlFor="role" className="text-right col-span-1">Role</Label>
                  <div className="col-span-3 grid grid-cols-2 gap-2">
                    <Button size="sm" className="w-full">Aide</Button>
                    <Button size="sm" className="w-full">Med Tech</Button>
                    <Button size="sm" className="w-full">Manager</Button>
                    <Button size="sm" className="w-full">Security</Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  <Label htmlFor="availability" className="text-right col-span-3 pt-2">Availability</Label>
                  <div className="col-span-4 flex flex-col gap-2">
                    {daysInWeek.map((day) => (
                      <div key={day.value} className="grid grid-cols-5 items-center gap-4">
                        <div className="col-span-1">
                          <Badge variant="secondary" className="w-14 justify-center">
                            {day.label}
                          </Badge>
                        </div>

                        <div className="col-span-4 flex items-center gap-4">
                          {["NOC", "AM", "EVE"].map((shift) => (
                            <div key={shift} className="flex items-center space-x-1">
                              <Checkbox
                                id={`${day.value}-${shift}`}
                              // Your logic here for state management
                              // checked={...}
                              // onCheckedChange={...}
                              />
                              <label
                                htmlFor={`${day.value}-${shift}`}
                                className="text-sm"
                              >
                                {shift}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <Label htmlFor="max-hours" className="text-right col-span-1">
                    Max hours (Ex. 40)
                  </Label>
                  <Input
                    id="max-hours"
                    type="number"
                    min={0}
                    className="w-20"
                  />
                </div>

              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button className="bg-success text-success-foreground hover:bg-success/80 dark:hover:bg-success/80 dark:bg-success dark:text-success-foreground">Save changes</Button>
                </SheetClose>
              </SheetFooter>

            </SheetContent>
          </Sheet>


        </div>
      </div>

      {
        loading ? (
          <p>Loading employees...</p>
        ) : filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p>No employees found.</p>
        )
      }
    </div >

  );

};

export default Employees;