import DivingSpotRepository from '../repositories/divingSpotRepository.js';
import CommentRepository from '../repositories/commentRepository.js';

class DivingSpotService {
 static async findAllDivingSpots() {
   return await DivingSpotRepository.findAll();
 }

 static async findDivingSpotById(id) {
   const divingSpot = await DivingSpotRepository.findById(id);
   if (!divingSpot) {
     throw new Error('Ponto de mergulho não encontrado');
   }
   return divingSpot;
 }

 static async findDivingSpotsByName(name) {
    return await DivingSpotRepository.findByName(name);
 }

 static async findDivingSpotsNearLocation(latitude, longitude) {
   return await DivingSpotRepository.findNearLocation(latitude, longitude);
 }

 static async filterDivingSpotsByRating(rating) {
    return await DivingSpotRepository.findByRating(rating);
 }

 static async filterDivingSpotsByDifficulty(difficulty) {
    return await DivingSpotRepository.findByDifficulty(difficulty);
 }

 static async createDivingSpot(divingSpotData) {
   return await DivingSpotRepository.create(divingSpotData);
 }

  static async updateAverageRating(divingSpotId) {
    const comments = await CommentRepository.findByDivingSpotId(divingSpotId);
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = comments.length > 0 ? parseFloat((totalRating / comments.length).toFixed(1)) : 0;

    return await DivingSpotRepository.updateById(divingSpotId, { averageRating });
  }

  static async updateAverageDifficulty(divingSpotId) {
    const comments = await CommentRepository.findByDivingSpotId(divingSpotId);

    const validComments = comments.filter(comment => comment.difficulty !== undefined);
    const totalDifficulty = validComments.reduce((sum, comment) => sum + comment.difficulty, 0);
    const averageDifficulty = validComments.length > 0 ? parseFloat((totalDifficulty / validComments.length).toFixed(1)) : 0;
   
    return await DivingSpotRepository.updateById(divingSpotId, { averageDifficulty });
  }   
}

export default DivingSpotService;
