// routes/scheduleRoutes.js
import express from 'express';
import {fetchEmployees, addEmployee } from '../controllers/scheduleControllers.js';

const router = express.Router();

// Define schedule-related routes
router.get('/employees', fetchEmployees);
router.post('/employees', addEmployee);

export default router;