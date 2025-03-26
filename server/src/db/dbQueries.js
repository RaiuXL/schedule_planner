import { pool } from './dbConnect.js';

// Function to get employees
export const getEmployees = async () => {
    try {
        const [results] = await pool.query(`
            SELECT 
                e.id,
                e.employee_name,
                GROUP_CONCAT(DISTINCT r.role_name SEPARATOR ', ') AS roles,
                GROUP_CONCAT(DISTINCT ea.available_day SEPARATOR ', ') AS availability
            FROM employees e
            LEFT JOIN employee_roles er ON e.id = er.employee_id
            LEFT JOIN roles r ON er.role_id = r.id
            LEFT JOIN employee_availability ea ON e.id = ea.employee_id
            GROUP BY e.id, e.employee_name;`);
        return results;
    } catch (err) {
        throw new Error("Error fetching employees: " + err.message);
    }
}