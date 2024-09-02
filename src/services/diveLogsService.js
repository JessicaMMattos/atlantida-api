import DiveLogsRepository from '../repositories/diveLogsRepository.js';
import DivingSpotService from '../services/divingSpotService.js';
import logger from '../utils/logger.js';

class DiveLogsService {
  static async findDiveLogById(id) {
    logger.info('DiveLogsService.findDiveLogById');
    return await DiveLogsRepository.findById(id);
  }

  static async findDiveLogsByUserId(userId) {
    logger.info('DiveLogsService.findDiveLogsByUserId');
    return await DiveLogsRepository.findByUserId(userId);
  }

  static async findDiveLogsByDateRange(startDate, endDate, userId) {
    logger.info('DiveLogsService.findDiveLogsByDateRange');
    return await DiveLogsRepository.findByDateRange(startDate, endDate, userId);
  }

  static async findDiveLogsByTitle(title, userId) {
    logger.info('DiveLogsService.findDiveLogsByTitle');
    return await DiveLogsRepository.findByTitle(title, userId);
  }

  static async findDiveLogsByDate(Date, userId) {
    logger.info('DiveLogsService.findDiveLogsByDate');
    return await DiveLogsRepository.findByDate(Date, userId);
  }

  static async findDiveLogsByLocationName(locationName, userId) {
    logger.info('DiveLogsService.findDiveLogsByLocationName');

    const divingSpots = await DivingSpotService.findDivingSpotsByName(locationName);

    const divingSpotIds = divingSpots.map(spot => spot._id);

    if (divingSpotIds.length === 0) {
      return [];
    }

    const diveLogs = await DiveLogsRepository.findByDivingSpotIdsAndUserId(divingSpotIds, userId);

    return diveLogs;
  }

  static async createDiveLog(diveLog) {
    logger.info('DiveLogsService.createDiveLog');
    const newDiveLog = await DiveLogsRepository.create(diveLog);

    if (diveLog.difficulty) {
      await DivingSpotService.updateAverageDifficulty(newDiveLog.divingSpotId);
    }
    if (diveLog.visibility) {
      await DivingSpotService.updateVisibility(newDiveLog.divingSpotId);
    }
    return newDiveLog;
  }

  static async updateDiveLog(id, update) {
    logger.info('DiveLogsService.updateDiveLog');
    const foundDiveLog = await DiveLogsRepository.findById(id);

    if (update.difficulty) {
      await DivingSpotService.updateAverageDifficulty(foundDiveLog.divingSpotId);
    }
    if (update.visibility) {
      await DivingSpotService.updateVisibility(foundDiveLog.divingSpotId);
    }

    return await DiveLogsRepository.updateById(id, update);
  }

  static async deleteDiveLog(id) {
    logger.info('DiveLogsService.deleteDiveLog');
    
    const foundDiveLog = await DiveLogsRepository.findById(id);
    if (!foundDiveLog) {
      throw new Error('Registro de mergulho não encontrado');
    }

    const deletedDiveLog = await DiveLogsRepository.deleteById(id);
    await DivingSpotService.updateAverageDifficulty(deletedDiveLog.divingSpotId);
    await DivingSpotService.updateVisibility(deletedDiveLog.divingSpotId);

    return deletedDiveLog;
  }
}

export default DiveLogsService;
