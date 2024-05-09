import express from "express";
import DiveLogsController from '../controllers/diveLogsController.js';
import { bearer } from '../middleware/autenticationMiddleware.js';

const diveLogsRoutes = express.Router();

diveLogsRoutes
  .get('/api/diveLogs/:id', DiveLogsController.findDiveLogById)
  .get('/api/diveLogs', bearer, DiveLogsController.findDiveLogsByToken)
  .get('/api/diveLogs/dateRange', bearer, DiveLogsController.findDiveLogsByDateRange)
  .get('/api/diveLogs/title/:title', bearer, DiveLogsController.findDiveLogsByTitle)
  .get('/api/diveLogs/rating/:rating', bearer, DiveLogsController.findDiveLogsByRating)
  .get('/api/diveLogs/location/:location', bearer, DiveLogsController.findDiveLogsByLocation)
  .post('/api/diveLogs', bearer, DiveLogsController.createDiveLog)
  .put('/api/diveLogs/:id', bearer, DiveLogsController.updateDiveLog)
  .delete('/api/diveLogs/:id', bearer, DiveLogsController.deleteDiveLog);

export default diveLogsRoutes;
