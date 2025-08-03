import { z } from "zod";

export const scheduleSchema = z.object({
    name: z.string().min(1, "Schedule name is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(4, "Year is required"),
});
