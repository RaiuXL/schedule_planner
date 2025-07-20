import React, { useState, useEffect } from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./EmployeesSchema";
import { roles, shifts, daysInWeek } from "./EmployeesConstants";
import { addEmployee, updateEmployee, fetchEmployees } from "@/services/api";
import { toast } from "sonner";
import { showToast } from "@/features/shared/toastHelpers";


const CreateEmployeeSheetForm = ({ editingEmployee, setEditingEmployee, onEmployeeAdded }) => {
    const [sheetOpen, setSheetOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            roles: [],
            availability: {},
        },
    });

    const resetFormToDefault = () => {
        form.reset({ name: "", roles: [], availability: {} });
    };

    const resetFormToEmployee = (employee) => {
        form.reset({
            name: employee.name,
            roles: employee.roles,
            availability: employee.availability || {},
        });
    };

    useEffect(() => {
        editingEmployee ? resetFormToEmployee(editingEmployee) : resetFormToDefault();
        setSheetOpen(!!editingEmployee);
    }, [editingEmployee]);

    const onSubmit = async (values) => {
        const payload = {
            name: values.name,
            roles: values.roles,
            availability: values.availability,
        };

        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee.id, payload);
                showToast.success("Employee updated", values.name);
            } else {
                await addEmployee(payload);
                showToast.success("Employee added", values.name);
            }

            setSheetOpen(false);
            setEditingEmployee(null);
            form.reset();

            const updated = await fetchEmployees();
            onEmployeeAdded(Array.isArray(updated.employees) ? updated.employees : []);
        } catch (err) {
            toast.error("Failed to save employee", { description: values.name });
        }
    };

    return (
        <Sheet open={sheetOpen} onOpenChange={(open) => {
            setSheetOpen(open);
            if (!open) {
                form.reset();
                setEditingEmployee(null);
            }
        }}>
            <SheetTrigger asChild>
                <Button onClick={() => setSheetOpen(true)} className="bg-success text-success-foreground hover:bg-success/80">
                    Add Employee
                </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-custom shadow-md">
                <SheetHeader>
                    <SheetTitle>{editingEmployee ? "Edit Employee" : "Add Employee"}</SheetTitle>
                    <SheetDescription>
                        Fill in the details and click "Submit" to {editingEmployee ? "update" : "add"} them.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-5 px-5 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-2">
                                    <FormLabel className="text-right">Name</FormLabel>
                                    <FormControl className="col-span-3">
                                        <Input placeholder="Enter name" autoComplete="name" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-4 text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="roles" render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-2">
                                <FormLabel className="text-right col-span-1">Role</FormLabel>
                                <div className="col-span-3 grid grid-cols-2 gap-2">
                                    {roles.map((role) => {
                                        const isSelected = field.value?.includes(role);
                                        const handleChange = () => {
                                            const current = field.value || [];
                                            field.onChange(isSelected ? current.filter(r => r !== role) : [...current, role]);
                                        };
                                        return (
                                            <button
                                                key={role}
                                                type="button"
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                onClick={handleChange}
                                                className={`w-full text-center rounded-sm border text-sm py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2
                                            ${isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-input"}`}
                                            >
                                                {role}
                                            </button>
                                        );
                                    })}
                                </div>
                                <FormMessage className="col-span-4 text-red-500 text-sm" />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="availability" render={({ field }) => (
                            <FormItem className="grid grid-cols-7 gap-2">
                                <FormLabel className="col-span-3 text-left">Availability</FormLabel>
                                <div className="col-span-4 flex flex-col gap-2">
                                    {daysInWeek.map(day => (
                                        <div key={day.value} className="grid grid-cols-5 items-center gap-4">
                                            <div className="col-span-1">
                                                <Badge variant="secondary" className="w-14 justify-center">{day.label}</Badge>
                                            </div>
                                            <div className="col-span-4 flex gap-4">
                                                {shifts.map(shift => {
                                                    const isChecked = field.value?.[day.value]?.includes(shift) ?? false;
                                                    const toggleShift = () => {
                                                        const current = field.value?.[day.value] ?? [];
                                                        const updatedDay = current.includes(shift)
                                                            ? current.filter(s => s !== shift)
                                                            : [...current, shift];
                                                        field.onChange({ ...field.value, [day.value]: updatedDay });
                                                    };
                                                    return (
                                                        <div key={shift} className="flex items-center space-x-1">
                                                            <Checkbox id={`${day.value}-${shift}`} checked={isChecked} onCheckedChange={toggleShift} />
                                                            <label htmlFor={`${day.value}-${shift}`} className="text-sm">{shift}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <FormMessage className="col-span-7 text-red-500 text-sm" />
                            </FormItem>
                        )} />
                        <SheetFooter>
                            <Button type="submit" className="w-full">
                                {editingEmployee ? "Update" : "Add"} Employee
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};

export default CreateEmployeeSheetForm;
