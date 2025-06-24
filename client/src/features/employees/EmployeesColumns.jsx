import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export const employeeColumns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "roles",
        header: "Roles",
        cell: ({ row }) => {
            const roles = row.original.roles?.split(',') || [];
            return (
                <div className="flex gap-1 flex-wrap">
                    {roles.map(role => (
                        <Badge key={role}>{role}</Badge>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: "availability",
        header: "Availability",
        cell: ({ row }) => {
            const availability = row.original.availability;
            if (!availability || typeof availability === 'string') return null;

            return (
                <div className="text-xs space-y-1">
                    {Object.entries(availability).map(([day, shifts]) =>
                        shifts.length > 0 ? (
                            <div key={day}>
                                <strong>{day}:</strong> {shifts.join(', ')}
                            </div>
                        ) : null
                    )}
                </div>
            );
        }
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const employee = row.original;

            return (
                <button
                    onClick={() => console.log("Delete", employee.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            );
        },
    }
];