import express from "express";
import DiveStatisticsController from '../controllers/diveStatisticsController.js';
import { bearer } from '../middleware/autenticationMiddleware.js';

const diveStatisticsRoutes = express.Router();

diveStatisticsRoutes
 .post('/api/diveStatistics', bearer, DiveStatisticsController.findDiveStatisticsByToken);

export default diveStatisticsRoutes;
