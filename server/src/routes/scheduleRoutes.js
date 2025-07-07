// routes/scheduleRoutes.js
import express from 'express';
import {fetchEmployees, addEmployee, removeEmployee, editEmployee, fetchSchedules, addSchedule, removeSchedule } from '../controllers/scheduleControllers.js';

const router = express.Router();

// EMPLOYEE ROUTES
router.get('/employees', fetchEmployees);
router.post('/employees', addEmployee);
router.delete('/employees/:id', removeEmployee);
router.put('/employees/:id', editEmployee);

// SCHEDULE ROUTES
router.get('/schedules', fetchSchedules);
router.post('/schedules', addSchedule);
router.delete('/schedules/:id', removeSchedule);

export default router;