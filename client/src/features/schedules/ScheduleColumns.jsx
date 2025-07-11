import { X, Pencil } from "lucide-react";
import { toast } from "sonner";
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

const ActionsCell = ({ schedule, onEdit, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteSchedule(schedule.id);
            toast.success(`Deleted ${schedule.name}`);
            onDelete?.();
        } catch {
            toast.error(`Failed to delete ${schedule.name}`);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <button onClick={() => onEdit?.(schedule)} className="text-primary hover:text-primary/80 transition-colors" title="Edit schedule">
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

export const scheduleColumns = (onDelete, onEdit) => [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const rawDate = row.original.created_at;
            const formattedDate = new Date(rawDate).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles", // Set your desired zone here
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
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ),
    }
];