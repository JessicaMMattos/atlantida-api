import DiveLog from '../models/diveLog.js';

class DiveLogsRepository {
 static async findById(id) {
    return await DiveLog.findById(id);
 }

 static async findByUserId(userId) {
    return await DiveLog.find({ userId }).sort({ date: -1 });
 }

 static async findByDivingSpotId(divingSpotId) {
   return await DiveLog.find({ divingSpotId });
}

 static async findByDateRange(startDate, endDate, userId) {
   const startOfDay = `${startDate}T00:00:00.000Z`;
   const endOfDay = `${endDate}T23:59:59.999Z`;
 
   const logs = await DiveLog.find({
     date: { $gte: startOfDay, $lte: endOfDay },
     userId: userId,
   })
   .sort({ date: 1 });
 
   return logs;
 }

static async findByTitle(title, userId) {
   const query = {
      title: { $regex: title, $options: 'i' },
      userId: userId
   };
   return await DiveLog.find(query).sort({ name: 1 });
}

static async findByDate(date, userId) {
   const startOfDay = `${date}T00:00:00.000Z`;
   const endOfDay = `${date}T23:59:59.999Z`;

   return await DiveLog.find({
      date: {
         $gte: startOfDay,
         $lt: endOfDay
      },
      userId: userId
   });
}


static async findByDivingSpotIdsAndUserId(divingSpotIds, userId) {
   return await DiveLog.find({
     divingSpotId: { $in: divingSpotIds },
     userId: userId
   });
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
