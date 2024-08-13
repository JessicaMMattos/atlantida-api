import mongoose from "mongoose";

const { Schema } = mongoose;

const diveLogSchema = new Schema({
  title: { type: String, required: true },
  divingSpotId: { type: Schema.Types.ObjectId, ref: 'divingSpots', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  depth: { type: Number, min: 0.0, required: true },
  bottomTimeInMinutes: { type: Number, min: 0, required: true },
  waterType: { type: String },
  waterBody: { type: String },
  weatherConditions: { type: String },
  temperature: {
    air: { type: Number },
    surface: { type: Number },
    bottom: { type: Number }
  },
  visibility: { type: String },
  waves: { type: String },
  current: { type: String },
  surge: { type: String },
  suit: { type: String },
  weight: { type: String },
  additionalEquipment: [{ type: String }],
  cylinder: {
    type: { type: String },
    size: { type: Number },
    gasMixture: { type: String },
    initialPressure: { type: Number },
    finalPressure: { type: Number },
    usedAmount: { type: Number }
  },
  rating: { type: Number, min: 0, max: 5 },
  difficulty: { type: Number, min: 1, max: 5 },
  notes: { type: String },
  photos: [{
    data: String,
    contentType: String
  }],
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
});

const DiveLog = mongoose.model('diveLogs', diveLogSchema);

export default DiveLog;
