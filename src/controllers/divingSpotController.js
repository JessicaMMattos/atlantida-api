import DivingSpotService from '../services/divingSpotService.js';

class DivingSpotController {
 static async findAllDivingSpots(_req, res) {
  try {
    const divingSpots = await DivingSpotService.findAllDivingSpots();
    res.status(200).json(divingSpots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 }

 static async findDivingSpotById(req, res) {
  try {
    const { id } = req.params;
    const divingSpot = await DivingSpotService.findDivingSpotById(id);
    res.status(200).json(divingSpot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 }

  static async findDivingSpotsByName(req, res) {
    try {
      const { name } = req.query;
      const divingSpots = await DivingSpotService.findDivingSpotsByName(name);
      res.status(200).json(divingSpots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async findDivingSpotsNearLocation(req, res) {
    try {
      const { latitude, longitude } = req.query;
      const divingSpots = await DivingSpotService.findDivingSpotsNearLocation(latitude, longitude);
      res.status(200).json(divingSpots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async filterDivingSpotsByRating(req, res) {
    try {
      const { rating } = req.query;
      const ratingNumber = parseFloat(rating);

      if (isNaN(ratingNumber) || ratingNumber < 0 || ratingNumber > 5) {
        return res.status(400).send({ message: 'Parâmetro de consulta inválido' });
      }

      const divingSpots = await DivingSpotService.filterDivingSpotsByRating(ratingNumber);
      return res.status(200).json(divingSpots);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  static async filterDivingSpotsByDifficulty(req, res) {
    try {
      const { difficulty } = req.query;
      const difficultyNumber = parseFloat(difficulty);

      if (isNaN(difficultyNumber) || difficultyNumber < 0 || difficultyNumber > 5) {
        return res.status(400).send({ message: 'Parâmetro de consulta inválido' });
      }

      const divingSpots = await DivingSpotService.filterDivingSpotsByDifficulty(difficultyNumber);
      return res.status(200).json(divingSpots);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  static async createDivingSpot(req, res) {
    try {
      const divingSpot = await DivingSpotService.createDivingSpot(req.body);
      res.status(201).json(divingSpot);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default DivingSpotController;
