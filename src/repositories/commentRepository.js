import Comment from '../models/comment.js';

class CommentRepository {
 static async findById(id) {
    return await Comment.findById(id);
 }

 static async findByDivingSpotId(divingSpotId) {
    return await Comment.find({ divingSpotId });
 }

 static async create(data) {
    const comment = new Comment(data);
    return await comment.save();
 }

 static async updateById(id, update) {
    return await Comment.findByIdAndUpdate(id, { $set: update }, { new: true });
 }

 static async deleteById(id) {
    return await Comment.findByIdAndDelete(id);
 }
}

export default CommentRepository;
