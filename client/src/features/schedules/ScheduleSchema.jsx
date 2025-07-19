import { z } from "zod";

export const scheduleSchema = z.object({
    name: z.string().min(1, "Schedule name is required"),
});

