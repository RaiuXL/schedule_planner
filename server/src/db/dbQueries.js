import { pool } from './dbConnect.js';

// GET employees from new table
export const getEmployees = async () => {
  try {
      const [results] = await pool.query(`
          SELECT id, name, roles, availability FROM employees;
      `);
      return results;
  } catch (err) {
      throw new Error("Error fetching employees: " + err.message);
  }
};

// INSERT employee into new table
export const insertEmployee = async ({ name, roles, availability }) => {
  try {
      const [result] = await pool.query(`
          INSERT INTO employees (name, roles, availability)
          VALUES (?, ?, ?)
      `, [name, roles, JSON.stringify(availability)]);
      
      return { id: result.insertId, name, roles, availability };
  } catch (err) {
      throw new Error("Error inserting employee: " + err.message);
  }
};