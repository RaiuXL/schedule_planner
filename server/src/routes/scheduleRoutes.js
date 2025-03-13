// routes/scheduleRoutes.js
import express from 'express';
import { fetchSchedules, fetchAvailability } from '../controllers/scheduleControllers.js';

const router = express.Router();

// Define schedule-related routes
router.get('/schedules', fetchSchedules);
router.get('/availability', fetchAvailability);

export default router;