import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSchedule, fetchSchedules } from "@/services/api";
import { showToast } from "@/features/shared/toastHelpers";
import { scheduleSchema } from "./ScheduleSchema";

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const years = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() + i;
  return { label: year.toString(), value: year.toString() };
});


const CreateScheduleDialogForm = ({ onScheduleAdded }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { name: "" },
  });

  const handleSubmit = async (values) => {
    try {
      const newSchedule = await addSchedule(values);
      showToast.success("Schedule created", newSchedule.schedule.name);
      form.reset();
      setOpen(false);
      const updated = await fetchSchedules();
      onScheduleAdded(updated.schedules || []);
    } catch (err) {
      showToast.error("Failed to create schedule", values.name);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-success text-success-foreground hover:bg-success/80"
      >
        Create Schedule
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Schedule</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter schedule name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Month & Year Row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <select {...field} className="border rounded px-3 py-2 text-sm">
                        <option value="">Select a month</option>
                        {months.map(({ label, value }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <select {...field} className="border rounded px-3 py-2 text-sm">
                        <option value="">Select a year</option>
                        {years.map(({ label, value }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateScheduleDialogForm;
