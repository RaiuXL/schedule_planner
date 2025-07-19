import { Badge } from "@/components/ui/badge";
import { X, Pencil } from "lucide-react";
import { showToast } from "@/features/shared/toastHelpers";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteEmployee } from "@/services/api";
import { daysInWeek } from "@/features/employees/EmployeesConstants";

// Render role badges
const RoleCell = ({ roles }) => {
    const roleList = roles?.split(',') || [];
    return (
        <div className="flex gap-1 flex-wrap">
            {roleList.map(role => <Badge key={role}>{role}</Badge>)}
        </div>
    );
};

const AvailabilityCell = ({ availability }) => {
    if (!availability || typeof availability === "string") return null;

    return (
        <div className="text-xs space-y-1">
            {daysInWeek.map(({ value: day }) => {
                const shifts = availability[day] || [];
                return shifts.length > 0 ? (
                    <div key={day}>
                        <strong>{day}:</strong> {shifts.join(", ")}
                    </div>
                ) : null;
            })}
        </div>
    );
};

// Action buttons for edit/delete
const ActionsCell = ({ employee, onEdit, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteEmployee(employee.id);
            showToast.success("Deleted", employee.name);
            onDelete?.();
        } catch {
            showToast.error("Failed to delete", employee.name);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <button onClick={() => onEdit?.(employee)} className="text-primary hover:text-primary/80 transition-colors" title="Edit employee">
                <Pencil className="w-4 h-4" />
            </button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="text-destructive hover:text-destructive/80 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {employee.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action is permanent and cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export const employeeColumns = (onDelete, onEdit) => [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "roles",
        header: "Roles",
        cell: ({ row }) => <RoleCell roles={row.original.roles} />,
    },
    {
        accessorKey: "availability",
        header: "Availability",
        cell: ({ row }) => <AvailabilityCell availability={row.original.availability} />,
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell
                employee={row.original}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ),
    }
];