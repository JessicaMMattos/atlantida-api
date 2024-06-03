import express from "express";
import CommentController from '../controllers/commentController.js';
import { bearer } from '../middleware/autenticationMiddleware.js';

const commentRoutes = express.Router();

commentRoutes
 .post('/api/comments', bearer, CommentController.createComment)
 .get('/api/:divingSpotId/comments', CommentController.findCommentsByDivingSpotId)
 .get('/api/comments/:id', CommentController.findCommentById)
 .get('/api/commentsByUserToken', CommentController.findCommentsByUserToken)
 .put('/api/comments/:id', bearer, CommentController.updateComment)
 .delete('/api/comments/:id', bearer, CommentController.deleteComment);

export default commentRoutes;
