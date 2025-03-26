// routes/scheduleRoutes.js
import express from 'express';
import {fetchEmployees } from '../controllers/scheduleControllers.js';


const router = express.Router();

// Define schedule-related routes
router.get('/employees', fetchEmployees);

export default router;