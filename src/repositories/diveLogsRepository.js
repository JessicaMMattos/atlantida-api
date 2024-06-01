import DiveLog from '../models/diveLog.js';

class DiveLogsRepository {
 static async findById(id) {
    return await DiveLog.findById(id);
 }

 static async findByUserId(userId) {
    return await DiveLog.find({ userId });
 }

 static async findByDivingSpotId(divingSpotId) {
   return await DiveLog.find({ divingSpotId });
}

 static async findByDateRange(startDate, endDate, userId) {
   return await DiveLog.find({
     date: { $gte: startDate, $lte: endDate },
     userId: userId
   });
}

static async findByTitle(title, userId) {
   const query = {
      title: { $regex: title, $options: 'i' },
      userId: userId
   };
   return await DiveLog.find(query).sort({ name: 1 });
}

static async findByDate(date, userId) {
   return await DiveLog.find({
      date: date,
     userId: userId
   });
}

static async findByLocation(location, userId) {
   const query = {
      location: { $regex: location, $options: 'i' },
      userId: userId
   };
   return await DiveLog.find(query);
}

 static async create(data) {
    const diveLog = new DiveLog(data);
    return await diveLog.save();
 }

 static async updateById(id, update) {
    return await DiveLog.findByIdAndUpdate(id, { $set: update }, { new: true });
 }

 static async deleteById(id) {
    return await DiveLog.findByIdAndDelete(id);
 }
}

export default DiveLogsRepository;
