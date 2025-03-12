import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({ path: "./config.env" });

const { DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

// Create a connection pool
export const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Max connections in pool
    queueLimit: 0, // No limit to waiting requests
});

pool.getConnection()
    .then(() => console.log(chalk.blue("Connected to DB schedule using connection pool!")))
    .catch(err => console.error(chalk.red("Error connecting to DB:", err)));