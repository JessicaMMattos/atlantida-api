import DiveStatistics from '../models/diveStatistics.js';

class DiveStatisticsRepository {
 static async create(data) {
    const diveStatistics = new DiveStatistics(data);
    return await diveStatistics.save();
 }

 static async findByUserId(userId) {
    return await DiveStatistics.findOne({ userId });
 }

 static async update(diveStatistics) {
    return await DiveStatistics.findByIdAndUpdate(diveStatistics._id, { $set: diveStatistics }, { new: true });
 }

 static async deleteByUserId(userId) {
    return await DiveStatistics.deleteOne({ userId });
 }
}

export default DiveStatisticsRepository;
