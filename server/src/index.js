import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
import scheduleRoutes from './routes/scheduleRoutes.js';

// Load environment variables
dotenv.config({ path: "./config.env" });
const { PORT } = process.env;

// Create Express app
const app = express();
app.use(cors());
app.use(express.json()); // << needed to parse JSON in requests
// Use routes
app.use('/api', scheduleRoutes);

app.listen(PORT, () => console.log(chalk.blue(`Server Running on Port ${PORT}`)));