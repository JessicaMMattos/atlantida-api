import DivingSpotRepository from '../repositories/divingSpotRepository.js';
import DiveLogsRepository from '../repositories/diveLogsRepository.js';
import CommentRepository from '../repositories/commentRepository.js';
import logger from '../utils/logger.js';

class DivingSpotService {
 static async findAllDivingSpots() {
   logger.info('DivingSpotService.findAllDivingSpots');
   return await DivingSpotRepository.findAll();
 }

 static async findDivingSpotById(id) {
  logger.info('DivingSpotService.findDivingSpotById');
   const divingSpot = await DivingSpotRepository.findById(id);
   if (!divingSpot) {
     throw new Error('Ponto de mergulho não encontrado');
   }
   return divingSpot;
 }

 static async findDivingSpotsByName(name) {
  logger.info('DivingSpotService.findDivingSpotsByName');
    return await DivingSpotRepository.findByName(name);
 }

 static async findDivingSpotsNearLocation(latitude, longitude) {
  logger.info('DivingSpotService.findDivingSpotsNearLocation');
   return await DivingSpotRepository.findNearLocation(latitude, longitude);
 }

 static async filterDivingSpotsByRating(rating) {
  logger.info('DivingSpotService.filterDivingSpotsByRating');
    return await DivingSpotRepository.findByRating(rating);
 }

 static async filterDivingSpotsByDifficulty(difficulty) {
  logger.info('DivingSpotService.filterDivingSpotsByDifficulty');
    return await DivingSpotRepository.findByDifficulty(difficulty);
 }

 static async createDivingSpot(divingSpotData) {
  logger.info('DivingSpotService.createDivingSpot');
   return await DivingSpotRepository.create(divingSpotData);
 }

  static async updateAverageRating(divingSpotId) {
    logger.info('DivingSpotService.updateAverageRating');
    const comments = await CommentRepository.findByDivingSpotId(divingSpotId);
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = comments.length > 0 ? parseFloat((totalRating / comments.length).toFixed(1)) : 0;

    return await DivingSpotRepository.updateById(divingSpotId, { averageRating });
  }

  static async updateAverageDifficulty(divingSpotId) {
    logger.info('DivingSpotService.updateAverageDifficulty');
    const diveLogs = await DiveLogsRepository.findByDivingSpotId(divingSpotId);
    const validDiveLogs = diveLogs.filter(diveLog => diveLog.difficulty !== undefined);

    const totalDifficulty = validDiveLogs.reduce((sum, diveLog) => sum + diveLog.difficulty, 0);
    const averageDifficulty = validDiveLogs.length > 0 ? parseFloat((totalDifficulty / validDiveLogs.length).toFixed(1)) : 0;

    return await DivingSpotRepository.updateById(divingSpotId, { averageDifficulty });
  }

  static async updateVisibility(divingSpotId) {
    logger.info('DivingSpotService.updateVisibility');
    
    const diveLogs = await DiveLogsRepository.findByDivingSpotId(divingSpotId);
    
    const validDiveLogs = diveLogs.filter(diveLog => diveLog.visibility !== undefined);

    const visibility = validDiveLogs.length > 0 
        ? validDiveLogs[validDiveLogs.length - 1].visibility 
        : 'N/A';

    return await DivingSpotRepository.updateById(divingSpotId, { visibility });
  }
}

export default DivingSpotService;
