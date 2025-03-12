// tools
import express from 'express';
import db from 'mysql2/promise';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';

// Get critcal information and select whats needed only
dotenv.config({ path: "./config.env" });
const { PORT, DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

// Make express server, use middle wear and notify us what port its running on
const app = express();
app.use(cors());
app.listen(PORT, () => console.log(chalk.blue(`Server Running on Port ${PORT}`)));

let connection; // accessible globally in this file, just declares no value assigned yet

// DB connection
const connectDB = async () => {
    try {
        connection = await db.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE
        });
        console.log(chalk.blue("Connected to DB schedule! on localhost:3306"));
    } catch (err) {
        console.log(chalk.red("Error with DB Connection", err));
    }
}

connectDB();

// API call
app.get('/api/schedules', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT id, employee_name FROM employees');
        res.status(200).json({
            message: `found ${results.length} records`,
            schedules: results
        });
    } catch (err) {
        console.error(chalk.red("Error fetching data:", err));
        res.status(500).json({ message: "Server error" });
    }
});