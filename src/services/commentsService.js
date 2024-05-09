import CommentRepository from '../repositories/commentRepository.js';
import DivingSpotRepository from '../repositories/divingSpotRepository.js';
import DivingSpotService from '../services/divingSpotService.js';

class CommentsService {
  static async findCommentById(id) {
    return await CommentRepository.findById(id);
  }

  static async findCommentsByDivingSpotId(divingSpotId) {
    return await CommentRepository.findByDivingSpotId(divingSpotId);
  }

  static async createComment(commentData) {
    const newComment = await CommentRepository.create(commentData);

    await DivingSpotService.updateAverageRating(commentData.divingSpotId);
    if (commentData.difficulty) {
      await DivingSpotService.updateAverageDifficulty(commentData.divingSpotId);
    }

    await DivingSpotRepository.incrementNumberOfComments(commentData.divingSpotId);
    return newComment;
  }

  static async updateComment(id, updateData) {
    const updatedComment = await CommentRepository.updateById(id, updateData);

    if (updateData.rating) {
      await DivingSpotService.updateAverageRating(updatedComment.divingSpotId);
    } 
    
    if (updateData.difficulty) {
      await DivingSpotService.updateAverageDifficulty(updatedComment.divingSpotId);
    }
    
    return updatedComment;
  }

  static async deleteComment(id) {
    const deletedComment = await CommentRepository.deleteById(id);

    await DivingSpotService.updateAverageRating(deletedComment.divingSpotId);
    await DivingSpotService.updateAverageDifficulty(deletedComment.divingSpotId);

    await DivingSpotRepository.decrementNumberOfComments(deletedComment.divingSpotId);
    return deletedComment;
  }
}

export default CommentsService;
