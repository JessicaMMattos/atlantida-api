import CommentsService from '../services/commentsService.js';
import TokenService from '../services/tokenService.js';

class CommentController {
  static async findCommentById(req, res) {
    try {
      const comment = await CommentsService.findCommentById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comentário não encontrado' });
      }

      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  static async findCommentsByDivingSpotId(req, res) {
    try {
      const comments = await CommentsService.findCommentsByDivingSpotId(req.params.divingSpotId);
      return res.status(200).send(comments);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  static async findCommentsByUserToken(req, res) {
    try {
      const userId = await TokenService.returnUserIdToToken(req.headers.authorization);
      const comments = await CommentsService.findCommentsByUserId(userId);

      return res.status(200).send(comments);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

 static async createComment(req, res) {
  try {
    req.body.userId = await TokenService.returnUserIdToToken(req.headers.authorization);

    const newComment = await CommentsService.createComment(req.body);
    return res.status(201).set('Location', `/api/comments/${newComment._id}`).json(newComment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

  static async updateComment(req, res) {
    try {
      const userId = await TokenService.returnUserIdToToken(req.headers.authorization);
      const comment = await CommentsService.findCommentById(req.params.id);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comentário não encontrado' });
      }
  
      if (comment.userId.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Usuário não autorizado a atualizar este comentário' });
      }
  
      const updatedComment = await CommentsService.updateComment(req.params.id, req.body);
      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const userId = await TokenService.returnUserIdToToken(req.headers.authorization);
      const comment = await CommentsService.findCommentById(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: 'Comentário não encontrado' });
      }

      if (comment.userId.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Usuário não autorizado a deletar este comentário' });
      }

      await CommentsService.deleteComment(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CommentController;
