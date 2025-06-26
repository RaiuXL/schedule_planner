// routes/scheduleRoutes.js
import express from 'express';
import {fetchEmployees, addEmployee, removeEmployee } from '../controllers/scheduleControllers.js';

const router = express.Router();

// Define schedule-related routes
router.get('/employees', fetchEmployees);
router.post('/employees', addEmployee);
router.delete('/employees/:id', removeEmployee);

export default router;