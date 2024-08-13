import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  rating: { type: Number, min: 0, max: 5, required: true },
  comment: { type: String },
  photos: [{
    data: String,
    contentType: String
  }],
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  divingSpotId: { type: Schema.Types.ObjectId, ref: 'divingSpots', required: true },
  createdDate: { type: Date, default: Date.now },
});

const Comment = mongoose.model('comments', commentSchema);

export default Comment;
