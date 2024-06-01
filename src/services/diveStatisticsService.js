import DiveLogsRepository from '../repositories/diveLogsRepository.js';

class DiveStatisticsService {
  static async getDiveStatisticsByUserId(userId, startDate, endDate) {
    try {
      const diveLogs = await DiveLogsRepository.findByUserIdAndDateRange(userId, startDate, endDate);

      if (!diveLogs || diveLogs.length === 0) {
        throw new Error('Nenhum mergulho encontrado para o período selecionado');
      }

      const totalDives = diveLogs.length;
      const totalBottomTime = diveLogs.reduce((total, log) => total + log.bottomTimeInMinutes, 0);
      const totalDepth = diveLogs.reduce((total, log) => total + log.depth, 0);
      const averageDepth = totalDepth / totalDives;

      const waterBodyCounts = this.countConditions(diveLogs, 'waterBody');
      const weatherConditionCounts = this.countConditions(diveLogs, 'weatherConditions');

      const mostCommonWaterBody = this.findMostCommonCondition(waterBodyCounts);
      const mostCommonWeatherCondition = this.findMostCommonCondition(weatherConditionCounts);

      return {
        totalDives,
        totalBottomTime,
        averageDepth,
        mostCommonWaterBody,
        mostCommonWeatherCondition
      };
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
    if (counts.size === 0) return null;
    return Array.from(counts.entries()).reduce((a, b) => (counts.get(a[0]) > counts.get(b[0]) ? a : b))[0];
  }
}

export default DiveStatisticsService;
