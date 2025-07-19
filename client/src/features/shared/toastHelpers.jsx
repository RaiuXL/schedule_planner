import { toast } from "sonner";

export const showToast = {
    success: (message, context = "") =>
        toast.success(context ? `${message}: ${context}` : message),

    error: (message, context = "") =>
        toast.error(context ? `${message}: ${context}` : message),
};
