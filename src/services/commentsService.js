import CommentRepository from '../repositories/commentRepository.js';
import DivingSpotRepository from '../repositories/divingSpotRepository.js';
import DivingSpotService from '../services/divingSpotService.js';
import logger from '../utils/logger.js';

class CommentsService {
  static async findCommentById(id) {
    logger.info('CommentsService.findCommentById');
    return await CommentRepository.findById(id);
  }

  static async findCommentsByDivingSpotId(divingSpotId) {
    logger.info('CommentsService.findCommentsByDivingSpotId');
    return await CommentRepository.findByDivingSpotId(divingSpotId);
  }

  static async findCommentsByUserId(userId) {
    logger.info('CommentsService.findCommentsByUserId');
    return await CommentRepository.findByUserId(userId);
  }

  static async createComment(commentData) {
    logger.info('CommentsService.createComment');
    const newComment = await CommentRepository.create(commentData);

    await DivingSpotService.updateAverageRating(commentData.divingSpotId);

    await DivingSpotRepository.incrementNumberOfComments(commentData.divingSpotId);
    return newComment;
  }

  static async updateComment(id, updateData) {
    logger.info('CommentsService.updateComment');
    const updatedComment = await CommentRepository.updateById(id, updateData);

    if (updateData.rating) {
      await DivingSpotService.updateAverageRating(updatedComment.divingSpotId);
    } 
    
    return updatedComment;
  }

  static async deleteComment(id) {
    logger.info('CommentsService.deleteComment');
    const deletedComment = await CommentRepository.deleteById(id);

    await DivingSpotService.updateAverageRating(deletedComment.divingSpotId);

    await DivingSpotRepository.decrementNumberOfComments(deletedComment.divingSpotId);
    return deletedComment;
  }
}

export default CommentsService;
