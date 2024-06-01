import DiveLogsRepository from '../repositories/diveLogsRepository.js';
import DiveStatisticsService from './diveStatisticsService.js';

class DiveLogsService {
  static async findDiveLogById(id) {
    return await DiveLogsRepository.findById(id);
  }

  static async findDiveLogsByUserId(userId) {
    return await DiveLogsRepository.findByUserId(userId);
  }

  static async findDiveLogsByDateRange(startDate, endDate, userId) {
    return await DiveLogsRepository.findByDateRange(startDate, endDate, userId);
  }

  static async findDiveLogsByTitle(title, userId) {
    return await DiveLogsRepository.findByTitle(title, userId);
  }

  static async findDiveLogsByDate(Date, userId) {
    return await DiveLogsRepository.findByDate(Date, userId);
  }

  static async findDiveLogsByLocation(location, userId) {
    return await DiveLogsRepository.findByLocation(location, userId);
  }

  static async createDiveLog(diveLog) {
    const newDiveLog = await DiveLogsRepository.create(diveLog);
    await DiveStatisticsService.addDiveInStatistics(newDiveLog);
    return newDiveLog;
  }

  static async updateDiveLog(id, update) {
    return await DiveLogsRepository.updateById(id, update);
  }

  static async deleteDiveLog(id) {
    const foundDiveLog = await DiveLogsRepository.findById(id);
    if (!foundDiveLog) {
      throw new Error('Registro de mergulho não encontrado');
    }

    const deletedDiveLog = await DiveLogsRepository.deleteById(id);
    await DiveStatisticsService.removeDipFromStat(deletedDiveLog);
    return deletedDiveLog;
  }
}

export default DiveLogsService;
