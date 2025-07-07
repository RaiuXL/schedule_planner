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

// DELETE employee from table
export const deleteEmployee = async (id) => {
    try {
      const [result] = await pool.query(`
        DELETE FROM employees WHERE id = ?
      `, [id]);
  
      return result.affectedRows > 0; // true if something was deleted
    } catch (err) {
      throw new Error("Error deleting employee: " + err.message);
    }
};

export const getEmployeeById = async (id) => {
    const query = "SELECT * FROM employees WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null;
  };

  // UPDATE employee in the table
export const updateEmployee = async (id, { name, roles, availability }) => {
  try {
    const [result] = await pool.query(`
      UPDATE employees
      SET name = ?, roles = ?, availability = ?
      WHERE id = ?
    `, [name, roles, JSON.stringify(availability), id]);

    return result.affectedRows > 0; // true if a row was updated
  } catch (err) {
    throw new Error("Error updating employee: " + err.message);
  }
};

// GET all schedules
export const getSchedules = async () => {
  const [rows] = await pool.query("SELECT id, name, created_at FROM schedules ORDER BY created_at DESC");
  return rows;
};

// INSERT a new schedule
export const insertSchedule = async ({ name }) => {
  const [result] = await pool.query("INSERT INTO schedules (name) VALUES (?)", [name]);
  return { id: result.insertId, name };
};

// DELETE schedule
export const deleteSchedule = async (id) => {
  const [result] = await pool.query("DELETE FROM schedules WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

