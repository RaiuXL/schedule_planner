import React from "react";
import { flexRender } from "@tanstack/react-table";

const EmployeeTableBodyRenderer = ({ table, filteredEmployees }) => {
    return (
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
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
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
    );
};

export default EmployeeTableBodyRenderer;
