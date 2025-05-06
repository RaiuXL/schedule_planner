import React, { useState, useEffect, useMemo } from "react";
import { fetchEmployees } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
const daysInWeek = [
  { label: "Sun", value: "Sunday" },
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "Sat", value: "Saturday" },
];
const roles = ["Aide", "Med Tech", "Manager", "Security"];
const shifts = ["NOC", "AM", "EVE"];

const Employees = () => {
  // 1.State
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", roles: [], availability: {} });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [employeeName, setEmployeeName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availability, setAvailability] = useState({});

  // 2.Effects
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

  // 3.Dervied State
  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) =>
        employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [employees, searchQuery]
  );
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "employee_name", header: "Name" },
      { accessorKey: "roles", header: "Roles" },
      { accessorKey: "availability", header: "Availability" },
    ],
    []
  );

  // 4.Handlers
  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };
  const toggleAvailability = (day, shift) => {
    setAvailability((prev) => {
      const currentShifts = prev[day] || [];
      if (currentShifts.includes(shift)) {
        return {
          ...prev,
          [day]: currentShifts.filter((s) => s !== shift),
        };
      } else {
        return {
          ...prev,
          [day]: [...currentShifts, shift],
        };
      }
    });
  };
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: employeeName,
      roles: selectedRoles,
      availability: availability,
    };
    console.log("Submitted Data:", JSON.stringify(employeeData, null, 2));
    if (!employeeName || selectedRoles.length === 0) {
      alert("Please enter a name and select at least one role.");
      return;
    }

  };

  // 5.Table Instance
  const table = useReactTable({
    data: filteredEmployees,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  // 6.Conditional early returns
  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (!filteredEmployees.length) {
    return <p className="text-center text-muted-foreground mt-6">No employees found.</p>;
  }

  // 7.JSX
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Employees</h1>
          <p>View and manage employees here.</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">

          {/* Search for Employee */}
          <Input
            id="searchEmployee"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded flex-1"
          />

          {/* Dropdown Column Menu */}
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

            {/* Add Employee Button */}
            <SheetTrigger asChild>
              <Button className="bg-success text-success-foreground hover:bg-success/80 dark:hover:bg-success/80 dark:bg-success dark:text-success-foreground">
                Add Employee
              </Button>
            </SheetTrigger>

            <SheetContent className="sheet-content-custom shadow-md">

              {/* Sheet Header */}
              <SheetHeader>
                <SheetTitle>Add a new employee</SheetTitle>
                <SheetDescription>
                  Here you can provide their information and be listed. Click save to finish and create a new instance of an employee.
                </SheetDescription>
              </SheetHeader>

              {/* The FORM */}
              <form onSubmit={handleAddEmployee} className="flex flex-col h-full">
                <div className="grid gap-5 px-5 py-4">
                  {/* Name */}
                  <div className="grid grid-cols-4 gap-2">
                    <Label htmlFor="name" className="text-right col-span-1">Name</Label>
                    <Input id="name" name="name" autoComplete="name" className="col-span-3" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                  </div>
                  {/* Role */}
                  <fieldset className="grid grid-cols-4 gap-2">
                    <div className="col-span-1 flex item-center">
                      <legend className="flex items-center gap-2 text-sm leading-none font-medium select-none text-left col-span-1">Role</legend>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-2">
                      {roles.map((role) => (
                        <label
                          key={role}
                          className={`w-full cursor-pointer border rounded-sm px-2 py-1 text-center transition-colors
                          ${selectedRoles.includes(role)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-input"
                            }
                        `}
                        >
                          <input
                            type="checkbox"
                            name="roles"
                            value={role}
                            checked={selectedRoles.includes(role)}
                            onChange={() => toggleRole(role)}
                            className="sr-only"
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {/* Availability */}
                  <fieldset className="grid grid-cols-7 gap-2 border-0 p-0 m-0">
                    <div className="col-span-3 flex items-center">
                      <legend className="text-sm leading-none font-medium select-none text-left">
                        Availability
                      </legend>
                    </div>
                    <div className="col-span-4 flex flex-col gap-2">
                      {daysInWeek.map((day) => (
                        <div key={day.value} className="grid grid-cols-5 items-center gap-4">
                          <div className="col-span-1">
                            <Badge variant="secondary" className="w-14 justify-center">
                              {day.label}
                            </Badge>
                          </div>
                          <div className="col-span-4 flex items-center gap-4">
                            {shifts.map((shift) => (
                              <div key={shift} className="flex items-center space-x-1">
                                <Checkbox
                                  id={`${day.value}-${shift}`}
                                  name={`availability[${day.value}]`}
                                  checked={availability[day.value]?.includes(shift) || false}
                                  onCheckedChange={() => toggleAvailability(day.value, shift)}
                                />
                                <label htmlFor={`${day.value}-${shift}`} className="text-sm">
                                  {shift}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  {/* Max Hours */}
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

                <SheetFooter className="px-5 pb-5">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </form>

            </SheetContent>
          </Sheet>

        </div>
      </div>

      {/* Loading Employee Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (table.getRowModel().rows.map((row) => (
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

    </div >
  );
};

export default Employees;