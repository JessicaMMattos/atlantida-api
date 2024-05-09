import DivingSpot from '../models/divingSpot.js';

class DivingSpotRepository {
 static async findAll() {
    return await DivingSpot.find({});
 }

 static async findById(id) {
   return await DivingSpot.findById(id);
 }

 static async findByName(name) {
    const query = { name: { $regex: name, $options: 'i' } };
    return await DivingSpot.find(query).sort({ name: 1 });
 }

 static async findNearLocation(latitude, longitude) {
    const query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    };
    return await DivingSpot.find(query).sort({ location: 1 });
 }

  static async findByRating(rating) {
    return await DivingSpot.find({ averageRating: { $gte: rating } });
  }

  static async findByDifficulty(difficulty) {
    return await DivingSpot.find({ averageDifficulty: { $lte: difficulty } });
  }

 static async create(data) {
    const divingSpot = new DivingSpot(data);
    return await divingSpot.save();
 }

  static async updateById(id, update) {
    return await DivingSpot.findByIdAndUpdate(id, { $set: update }, { new: true });
  }

  static async incrementNumberOfComments(divingSpotId) {
    return await DivingSpot.findByIdAndUpdate(divingSpotId, { $inc: { numberOfComments: 1 } }, { new: true });
  }

  static async decrementNumberOfComments(divingSpotId) {
    const divingSpot = await DivingSpot.findById(divingSpotId);
    if (divingSpot.numberOfComments > 0) {
       return await DivingSpot.findByIdAndUpdate(divingSpotId, { $inc: { numberOfComments: -1 } }, { new: true });
    }
    return divingSpot;
   }
}

export default DivingSpotRepository;
