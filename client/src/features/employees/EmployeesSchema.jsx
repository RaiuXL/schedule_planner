import { z } from "zod";
import { roles, shifts } from "./EmployeesConstants";

export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    roles: z.array(z.enum(roles)).min(1),
    availability: z.record(
        z.enum([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]),
        z.array(z.enum(shifts))
    )
});
