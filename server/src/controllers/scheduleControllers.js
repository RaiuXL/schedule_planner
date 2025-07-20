// controllers/scheduleController.js
import { getEmployees, insertEmployee, deleteEmployee, getEmployeeById, updateEmployee, getSchedules, insertSchedule, deleteSchedule } from '../db/dbQueries.js';
import chalk from 'chalk';

// Fetch all information of employees
export const fetchEmployees = async (req, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json({
            message: `Found ${employees.length} records`,
            employees
        });
    } catch (err) {
        console.error(chalk.red("Error fetching employees:", err));
        res.status(500).json({ message: "Server error" });
    }
}

export const addEmployee = async (req, res) => {
    try {
      const { name, roles, availability } = req.body;
  
      if (!name || !Array.isArray(roles) || typeof availability !== 'object') {
        console.warn("Invalid input data received:", req.body);
        return res.status(400).json({ message: "Invalid input data" });
    }
  
      const newEmployee = await insertEmployee({ name, roles, availability });
      console.log(chalk.green("Created employee:"), newEmployee);

      return res.status(201).json({
        message: "Employee added successfully",
        employee: newEmployee,
      });
    } catch (err) {
      console.error(chalk.red("Error adding employee:", err));
      return res.status(500).json({
        message: "Server error while adding employee",
        error: err.message,
      });
    }
      
  };

  export const removeEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Get the employee before deletion
      const employee = await getEmployeeById(id);
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Log what will be deleted
      console.log(chalk.red("Deleted employee:"), employee);
  
      const success = await deleteEmployee(id);
  
      if (!success) {
        return res.status(500).json({ message: "Failed to delete employee from DB" });
      }
  
      return res.status(200).json({
        message: "Employee deleted successfully",
        deletedEmployee: employee,
      });
    } catch (error) {
      console.error("Error in removeEmployee:", error);
      return res.status(500).json({ message: "Server error while deleting employee" });
    }
  };

  export const editEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, roles, availability } = req.body;
  
      if (!name || !Array.isArray(roles) || typeof availability !== 'object') {
        console.warn("Invalid update data received:", req.body);
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      const updated = await updateEmployee(id, { name, roles, availability });
  
      if (!updated) {
        return res.status(404).json({ message: "Employee not found or update failed" });
      }
  
      console.log(chalk.blue("Updated employee:"), { id, name, roles, availability });
  
      return res.status(200).json({
        message: "Employee updated successfully",
        employee: { id, name, roles, availability }
      });
  
    } catch (err) {
      console.error(chalk.red("Error updating employee:", err));
      return res.status(500).json({
        message: "Server error while updating employee",
        error: err.message
      });
    }
  };

  // GET all schedules
  export const fetchSchedules = async (req, res) => {
    try {
      const schedules = await getSchedules();
      res.status(200).json({ schedules });
    } catch (err) {
      console.error("Error fetching schedules:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // POST new schedule
  export const addSchedule = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Schedule name is required" });
      const newSchedule = await insertSchedule({ name });
      return res.status(201).json({ message: "Schedule created", schedule: newSchedule });
    } catch (err) {
      console.error("Error creating schedule:", err);
      return res.status(500).json({ message: "Server error" }); // <--- add return here
    }
  };  

  // DELETE schedule
  export const removeSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const success = await deleteSchedule(id);
  
      if (!success) {
        return res.status(404).json({ message: "Schedule not found" });
      }
  
      return res.status(200).json({ message: "Schedule deleted", id });
    } catch (err) {
      console.error("Error deleting schedule:", err);
      return res.status(500).json({ message: "Server error" }); // <--- add return here
    }
  };
  
  