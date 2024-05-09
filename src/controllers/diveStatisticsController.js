import DiveStatisticsService from '../services/diveStatisticsService.js';
import TokenService from '../services/tokenService.js';

class DiveStatisticsController {
  static findDiveStatisticsByToken = async (req, res) => {
    try {
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);
      const diveStatistics = await DiveStatisticsService.findDiveStatisticsByUserId(id);

      res.status(200).json(diveStatistics);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default DiveStatisticsController;
