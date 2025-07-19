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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateScheduleDialogForm;
