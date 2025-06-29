import React from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EmployeeForm from "@/features/employees/EmployeesForm";
import { roles, shifts, daysInWeek } from "@/features/employees/EmployeesConstants";

const EmployeeSheet = ({
    isOpen,
    onOpenChange,
    editingEmployee,
    onSubmit,
    form,
}) => {
    return (
        <Sheet open={isOpen} onOpenChange={(open) => {
            onOpenChange(open);
        }}>
            <SheetTrigger asChild>
                <Button className="bg-success text-success-foreground hover:bg-success/80">
                    {editingEmployee ? "Edit Employee" : "Add Employee"}
                </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-custom shadow-md">
                <SheetHeader>
                    <SheetTitle>
                        {editingEmployee ? "Edit employee" : "Add a new employee"}
                    </SheetTitle>
                    <SheetDescription>
                        Fill in the details and click "Submit" to {editingEmployee ? "update" : "add"} them.
                    </SheetDescription>
                </SheetHeader>
                <EmployeeForm
                    form={form}
                    onSubmit={onSubmit}
                    roles={roles}
                    shifts={shifts}
                    daysInWeek={daysInWeek}
                />
            </SheetContent>
        </Sheet>
    );
};

export default EmployeeSheet;