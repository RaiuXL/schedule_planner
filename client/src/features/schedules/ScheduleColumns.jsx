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
import { deleteSchedule } from "@/services/api";
import { Link } from "react-router-dom";


const ActionsCell = ({ schedule, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteSchedule(schedule.id);
            showToast.success("Deleted", schedule.name);
            onDelete?.();
        } catch {
            showToast.error("Failed to delete", schedule.name);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <Link
                to={`/schedules/${schedule.id}/edit`}
                className="text-primary hover:text-primary/80 transition-colors"
                title="Edit schedule"
            >
                <Pencil className="w-4 h-4" />
            </Link>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="text-destructive hover:text-destructive/80 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {schedule.name}?</AlertDialogTitle>
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

export const scheduleColumns = (onDelete) => [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "month",
        header: "Month",
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const rawDate = row.original.created_at;
            const formattedDate = new Date(rawDate).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
            });
            return <span>{formattedDate}</span>;
        },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell
                schedule={row.original}
                onDelete={onDelete}
            />
        ),
    }
];