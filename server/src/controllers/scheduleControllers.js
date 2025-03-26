// controllers/scheduleController.js
import { getEmployees } from '../db/dbQueries.js';
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