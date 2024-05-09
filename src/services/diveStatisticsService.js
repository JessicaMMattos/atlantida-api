import DiveStatisticsRepository from '../repositories/diveStatisticsRepository.js';
import DiveLogsRepository from '../repositories/diveLogsRepository.js';

class DiveStatisticsService {
 static async updateMostCommonConditions(userId) {
    try {
      const diveLogs = await DiveLogsRepository.findByUserId(userId);
      const waterBodyCounts = this.countConditions(diveLogs, 'waterBody');
      const weatherConditionCounts = this.countConditions(diveLogs, 'weatherConditions');

      const environmentalConditionStatistics = {
        commonWaterBody: waterBodyCounts.size > 0 ? this.findMostCommonCondition(waterBodyCounts) : null,
        commonWeatherCondition: weatherConditionCounts.size > 0 ? this.findMostCommonCondition(weatherConditionCounts) : null
      };

      return environmentalConditionStatistics;
    } catch (error) {
      throw new Error(error.message);
    }
 }

 static countConditions(diveLogs, conditionType) {
    const counts = new Map();
    diveLogs.forEach(log => {
      const condition = log[conditionType];
      if (condition) {
        counts.set(condition, (counts.get(condition) || 0) + 1);
      }
    });
    return counts;
 }

 static findMostCommonCondition(counts) {
    return Array.from(counts.entries()).reduce((a, b) => counts.get(a[0]) > counts.get(b[0]) ? a : b)[0];
 }

 static async addDiveInStatistics(newDiveLog) {
    try {
      let diveStatistics = await DiveStatisticsRepository.findByUserId(newDiveLog.userId);

      if (!diveStatistics || Object.keys(diveStatistics).length === 0) {
        diveStatistics = await DiveStatisticsRepository.create({
          userId: newDiveLog.userId,
          totalDives: 1,
          averageDepth: newDiveLog.depth,
          totalDepth: newDiveLog.depth,
          totalBottomTime: newDiveLog.bottomTimeInMinutes,
          mostCommonWaterBody: newDiveLog.waterBody || null,
          mostCommonWeatherCondition: newDiveLog.weatherConditions || null
        });
      } else {
        // Atualizar as estatísticas existentes
        diveStatistics.totalDives += 1;
        diveStatistics.totalDepth += newDiveLog.depth;
        diveStatistics.averageDepth = parseFloat((diveStatistics.totalDepth / diveStatistics.totalDives).toFixed(1));
        diveStatistics.totalBottomTime += newDiveLog.bottomTimeInMinutes;

        await this.updateStatisticsConditions(diveStatistics, newDiveLog.userId);

        await DiveStatisticsRepository.update(diveStatistics);
      }
    } catch (error) {
      throw new Error(error.message);
    }
 }

 static async removeDipFromStat(diveLogToRemove) {
    try {
      let diveStatistics = await DiveStatisticsRepository.findByUserId(diveLogToRemove.userId);
      if (!diveStatistics) {
        throw new Error('Estatísticas de mergulho não encontradas');
      }

      diveStatistics.totalDives -= 1;
      if (diveStatistics.totalDives > 0) {
        diveStatistics.totalDepth -= diveLogToRemove.depth;

        diveStatistics.averageDepth = parseFloat((diveStatistics.totalDepth / diveStatistics.totalDives).toFixed(1));
        diveStatistics.totalBottomTime -= diveLogToRemove.bottomTimeInMinutes;
      } else {
        await DiveStatisticsRepository.deleteByUserId({ userId: diveLogToRemove.userId });
        return;
      }

      await this.updateStatisticsConditions(diveStatistics, diveLogToRemove.userId);

      await DiveStatisticsRepository.update(diveStatistics);
    } catch (error) {
      throw new Error(error.message);
    }
 }

 static async updateStatisticsConditions(diveStatistics, userId) {
    const { commonWaterBody, commonWeatherCondition } = await this.updateMostCommonConditions(userId);
    diveStatistics.mostCommonWaterBody = commonWaterBody;
    diveStatistics.mostCommonWeatherCondition = commonWeatherCondition;
 }

 static async findDiveStatisticsByUserId(userId) {
    return await DiveStatisticsRepository.findByUserId(userId);
 }
}

export default DiveStatisticsService;
