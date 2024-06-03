import DiveLogsService from '../services/diveLogsService.js';
import TokenService from '../services/tokenService.js';

class DiveLogsController {
 static async findDiveLogById(req, res) {
  try {
    const foundDiveLog = await DiveLogsService.findDiveLogById(req.params.id);
    if (!foundDiveLog) {
      return res.status(400).send({ message: 'Registro de mergulho não encontrado' });
    }
    return res.status(200).json(foundDiveLog);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
 }

 static async findDiveLogsByToken(req, res) {
  try {
    const userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const diveLogs = await DiveLogsService.findDiveLogsByUserId(userId);
    return res.status(200).send(diveLogs);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
 }

 static async findDiveLogsByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.body;
    const userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const diveLogs = await DiveLogsService.findDiveLogsByDateRange(startDate, endDate, userId);
    return res.status(200).json(diveLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

static async findDiveLogsByTitle(req, res) {
  try {
    const { title } = req.params;
    const userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const diveLogs = await DiveLogsService.findDiveLogsByTitle(title, userId);
    return res.status(200).json(diveLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

static async findDiveLogsByDate(req, res) {
  try {
    const { date } = req.body;
    const userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const diveLogs = await DiveLogsService.findDiveLogsByDate(date, userId);
    return res.status(200).json(diveLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

static async findDiveLogsByLocationName(req, res) {
  try {
    const { locationName } = req.params;
    const userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const diveLogs = await DiveLogsService.findDiveLogsByLocationName(locationName, userId);
    return res.status(200).json(diveLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

 static async createDiveLog(req, res) {
  try {
    req.body.userId = await TokenService.returnUserIdToToken(req.headers.authorization);
    const newDiveLog = await DiveLogsService.createDiveLog(req.body);

    return res.status(201).set('Location', `/api/diveLogs/${newDiveLog._id}`).json(newDiveLog);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
 }

 static async updateDiveLog(req, res) {
  try {
    const updatedDiveLog = await DiveLogsService.updateDiveLog(req.params.id, req.body);
    if (!updatedDiveLog) {
      return res.status(404).json({ message: 'Registro de mergulho não encontrado' });
    }

    return res.status(200).json(updatedDiveLog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
 }

 static async deleteDiveLog(req, res) {
  try {
    await DiveLogsService.deleteDiveLog(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
 }
}

export default DiveLogsController;
