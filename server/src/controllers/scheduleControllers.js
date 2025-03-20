// controllers/scheduleController.js
import { getSchedules, getAvailability, getEmployees } from '../db/dbQueries.js';
import chalk from 'chalk';

// Fetch all schedules
export const fetchSchedules = async (req, res) => {
    try {
        const schedules = await getSchedules();
        res.status(200).json({
            message: `Found ${schedules.length} records`,
            schedules
        });
    } catch (err) {
        console.error(chalk.red("Error fetching schedules:", err));
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch employee availability
export const fetchAvailability = async (req, res) => {
    try {
        const availability = await getAvailability();
        res.status(200).json({
            message: `Found ${availability.length} records`,
            availability
        });
    } catch (err) {
        console.error(chalk.red("Error fetching availability:", err));
        res.status(500).json({ message: "Server error" });
    }
};

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