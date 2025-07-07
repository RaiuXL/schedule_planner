import React, { useState, useMemo } from "react";

import { scheduleColumns } from "./ScheduleColumns";
import ScheduleTableBodyRenderer from "./ScheduleTableBodyRenderer";
import { fetchSchedules } from "@/services/api";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const ScheduleTable = ({ data, onScheduleAdded }) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleDeleteRefresh = async () => {
        const updated = await fetchSchedules();
        onScheduleAdded(Array.isArray(updated.schedules) ? updated.schedules : []);
    };

    const filteredSchedules = useMemo(
        () =>
            data.filter((emp) =>
                emp.name?.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [data, searchQuery]
    );

    const table = useReactTable({
        data: filteredSchedules,
        columns: scheduleColumns(
            handleDeleteRefresh, () => { }
        ),
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <div className="space-y-4">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold">Schedules</h1>
                    <p className="text-muted-foreground">View and manage schedules here.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        type="text"
                        placeholder="Search schedules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm w-full md:w-auto"
                    />
                    <Button className="bg-success text-success-foreground hover:bg-success/80">
                        Create Schedule
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="max-h-[650px] overflow-y-auto border rounded-md">
                    <ScheduleTableBodyRenderer table={table} filteredSchedule={filteredSchedules} />
                </div>
            </div>

        </div>
    );


}

export default ScheduleTable;