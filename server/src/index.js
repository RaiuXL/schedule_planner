// Tools
import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
import { getSchedules, getAvailability } from './db/dbQueries.js';

// Load environment variables
dotenv.config({ path: "./config.env" });
const { PORT } = process.env;

// Make express server
const app = express();
app.use(cors());
app.listen(PORT, () => console.log(chalk.blue(`Server Running on Port ${PORT}`)));

// API call - Get schedules
app.get('/api/schedules', async (req, res) => {
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
});

// API call - Get availability
app.get('/api/availability', async (req, res) => {
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
});