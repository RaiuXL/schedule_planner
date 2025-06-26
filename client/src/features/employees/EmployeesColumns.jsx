import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
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
import { toast } from "sonner";
import { deleteEmployee } from "@/services/api";

export const employeeColumns = (onEmployeeDeleted) => [
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
            const handleDelete = async () => {
                try {
                    await deleteEmployee(employee.id);
                    toast.success(`Deleted ${employee.name}`);
                    onEmployeeDeleted?.(); // trigger parent to refresh
                } catch {
                    toast.error(`Failed to delete ${employee.name}`);
                }
            };

            return (
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
            );
        },
    }
];