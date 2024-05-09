import CommentsService from '../services/commentsService.js';

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

 static async createComment(req, res) {
  try {
    const newComment = await CommentsService.createComment(req.body);
    return res.status(201).set('Location', `/api/comments/${newComment._id}`).json(newComment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

  static async updateComment(req, res) {
    try {
      const updatedComment = await CommentsService.updateComment(req.params.id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comentário não encontrado' });
      }
      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      await CommentsService.deleteComment(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CommentController;
