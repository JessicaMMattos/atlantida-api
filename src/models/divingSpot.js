import mongoose from "mongoose";

const { Schema } = mongoose;

const divingSpotSchema = new Schema({
 name: { type: String, required: true },
 description: { type: String },
 image: { data: String, contentType: String },
 location: {
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  } 
 },
 waterBody: { type: String, required: true },
 visibility: { type: String },
 averageRating: { type: Number, min: 0, max: 5 },
 averageDifficulty: { type: Number, min: 0, max: 5 },
 numberOfComments: { type: Number, default: 0 },
 createdDate: { type: Date, default: Date.now }
});

divingSpotSchema.index({ location: '2dsphere' });

const DivingSpot = mongoose.model('divingSpots', divingSpotSchema);

export default DivingSpot;
