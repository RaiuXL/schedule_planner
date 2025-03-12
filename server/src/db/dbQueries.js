import { pool } from './dbConnect.js';

// Function to get schedules
export const getSchedules = async () => {
    try {
        const [results] = await pool.query('SELECT id, employee_name FROM employees');
        return results;
    } catch (err) {
        throw new Error("Error fetching schedules: " + err.message);
    }
};

// Function to get employee availability
export const getAvailability = async () => {
    try {
        const [results] = await pool.query('SELECT employee_id, available_day FROM employee_availability');
        return results;
    } catch (err) {
        throw new Error("Error fetching availability: " + err.message);
    }
};