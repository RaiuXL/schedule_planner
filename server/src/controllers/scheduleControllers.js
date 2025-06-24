// controllers/scheduleController.js
import { getEmployees, insertEmployee } from '../db/dbQueries.js';
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
    console.log(req.body)
    try {
      const { name, roles, availability } = req.body;
  
      if (!name || typeof roles !== 'string' || typeof availability !== 'object') {
        return res.status(400).json({ message: "Invalid input data" });
    }
  
      const newEmployee = await insertEmployee({ name, roles, availability });
  
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