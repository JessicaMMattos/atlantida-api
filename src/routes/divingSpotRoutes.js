import express from "express";
import DivingSpotController from '../controllers/divingSpotController.js';
import { bearer } from '../middleware/autenticationMiddleware.js';

const divingSpotRoutes = express.Router();

divingSpotRoutes
 .get('/api/divingSpots', DivingSpotController.findAllDivingSpots)
 .get('/api/divingSpotsByName', DivingSpotController.findDivingSpotsByName)
 .get('/api/divingSpotsByLocation', DivingSpotController.findDivingSpotsNearLocation)
 .get('/api/divingSpotsByRating', DivingSpotController.filterDivingSpotsByRating)
 .get('/api/divingSpotsByDifficulty', DivingSpotController.filterDivingSpotsByDifficulty)
 .get('/api/divingSpots/:id', DivingSpotController.findDivingSpotById)
 .post('/api/divingSpots', bearer, DivingSpotController.createDivingSpot)

export default divingSpotRoutes;
