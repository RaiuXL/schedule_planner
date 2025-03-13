// controllers/scheduleController.js
import { getSchedules, getAvailability } from '../db/dbQueries.js';
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