import mongoose from "mongoose";

const { Schema } = mongoose;

const diveStatisticsSchema = new Schema({
  totalDives: { type: Number, required: true },
  totalDepth: { type: Number, required: true },
  averageDepth: { type: Number, required: true },
  totalBottomTime: { type: Number, required: true },
  mostCommonWaterBody: { type: String },
  mostCommonWeatherCondition: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
});

const DiveStatistics = mongoose.model('diveStatistics', diveStatisticsSchema);

export default DiveStatistics;
