import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getScheduleById, fetchEmployees } from "@/services/api";
import { shifts, daysInWeek } from "@/features/employees/EmployeesConstants";
const shiftRoleMap = {
  AM: ["Manager", "Med Tech", "Aide"],
  EVE: ["Manager", "Med Tech", "Aide", "Security"],
  NOC: ["Med Tech", "Aide", "Security"],
};
const shiftColorClasses = {
  AM: "bg-blue-300 dark:bg-blue-900",
  EVE: "bg-green-300 dark:bg-green-900",
  NOC: "bg-red-300 dark:bg-red-900",
};
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function getCandidates({ employees, role, day, shift }) {

  const qualified = employees.filter(
    (e) => Array.isArray(e.roles) && e.roles.includes(role)
  );
  const available = [];
  const unavailable = [];

  for (const e of qualified) {
    const dayAvail = e.availability?.[day] || [];
    if (dayAvail.includes(shift)) available.push(e);
    else unavailable.push(e);
  }

  return { available, unavailable };
}

const AssignCell = ({ day, shift, role, employees, value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const { available, unavailable } = React.useMemo(
    () => getCandidates({ employees, role, day, shift }),
    [employees, role, day, shift]
  );

  const selected = Array.isArray(value) ? value : [];
  const selectedEmployees = React.useMemo(
    () => selected.map((id) => employees.find((e) => e.id === id)).filter(Boolean),
    [selected, employees]
  );

  return (
    <div className="flex flex-col h-full justify-start">
      {/* Add button at top */}
      <div className="flex justify-end mb-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-foreground text-xs hover:bg-muted/80"
              title="Assign Employee"
            >
              +
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-64 p-0 z-50">
            <Command>
              <CommandInput placeholder={`Search ${role}…`} />
              <CommandList className="max-h-60">
                <CommandEmpty>No matches.</CommandEmpty>

                <CommandGroup heading="Available">
                  {available.length === 0 && (
                    <div className="px-3 py-2 text-xs text-muted-foreground">
                      No available employees
                    </div>
                  )}
                  {available.map((emp) => (
                    <CommandItem
                      key={emp.id}
                      value={emp.name}
                      onSelect={() => {
                        onSelect((prev) => [...prev, emp.id]);
                        setOpen(false);
                      }}
                    >
                      {emp.name}
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandGroup heading="Qualified (not available)">
                  {unavailable.length === 0 && (
                    <div className="px-3 py-2 text-xs text-muted-foreground">
                      None
                    </div>
                  )}
                  {unavailable.map((emp) => (
                    <CommandItem
                      key={emp.id}
                      value={emp.name}
                      onSelect={() => {
                        onSelect((prev) => [...prev, emp.id]);
                        setOpen(false);
                      }}
                    >
                      {emp.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Employee blocks below */}
      <div className="flex flex-col gap-1 overflow-visible">
        {selectedEmployees.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between text-sm bg-accent text-accent-foreground rounded px-2 py-1 max-w-full"
          >
            <span className="truncate">{emp.name}</span>
            <button
              onClick={() =>
                onSelect((prevSelected) =>
                  prevSelected.filter((id) => id !== emp.id)
                )
              }
              className="ml-2 text-red-500 hover:text-red-700 font-bold"
              title="Remove"
            >
              −
            </button>
          </div>
        ))}

      </div>
    </div>
  );

};

const ScheduleEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getScheduleById(id);
        setSchedule(data.schedule);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(Array.isArray(data.employees) ? data.employees : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  return (
    <div className="min-h-screen py-2 px-4 sm:px-8">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Preview</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>

      <div className="rounded-lg shadow p-4 overflow-x-auto w-full">

        <div className=" bg-muted grid text-center text-sm font-medium border-b" style={{ gridTemplateColumns: '300px repeat(7, 1fr)' }}>
          <div className="p-5 text-left font-semibold">Shifts</div>
          {daysInWeek.map((day) => (
            <div key={day.value} className="p-5">{day.label}</div>
          ))}
        </div>

        {shifts.map((shift) => (
          <React.Fragment key={shift}>
            <div
              className={`grid text-center text-sm font-medium border-b ${shiftColorClasses[shift]}`}
              style={{ gridTemplateColumns: '300px repeat(7, 1fr)' }}
            >
              <div className="p-2 text-left font-semibold">{shift}</div>
              <div className="col-span-7"></div>
            </div>


            {shiftRoleMap[shift].map((role) => (
              <div
                key={`${shift}-${role}`}
                className="grid text-sm border-b"
                style={{ gridTemplateColumns: "300px repeat(7, 1fr)" }}
              >
                <div className="p-5 text-left font-medium bg-accent text-accent-foreground">
                  {role}
                </div>
                {daysInWeek.map((day) => {
                  const cellKey = `${shift}|${role}|${day.value}`;
                  return (
                    <div
                      key={cellKey}
                      className="p-2 border bg-card text-card-foreground"
                    >
                      <AssignCell
                        day={day.value}
                        shift={shift}
                        role={role}
                        employees={employees}
                        value={assignments[cellKey] || []}
                        onSelect={(updateFn) =>
                          setAssignments((prev) => ({
                            ...prev,
                            [cellKey]: updateFn(prev[cellKey] || []),
                          }))
                        }

                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}

      </div>

    </div>
  );
};

export default ScheduleEditorPage;
