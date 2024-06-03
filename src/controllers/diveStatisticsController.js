import DiveStatisticsService from '../services/diveStatisticsService.js';
import TokenService from '../services/tokenService.js';

class DiveStatisticsController {
  static findDiveStatisticsByToken = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);
      const diveStatistics = await DiveStatisticsService.getDiveStatisticsByUserId(id, startDate, endDate);

      res.status(200).json(diveStatistics);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default DiveStatisticsController;
