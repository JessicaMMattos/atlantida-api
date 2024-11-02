import mongoose from "mongoose";
import { validateIssuanceDate } from "./validation.js";

const { Schema } = mongoose;

const certificateSchema = new Schema({
  certificateName: { type: String, required: true },
  accreditor: { type: String, required: true },
  certificationNumber: { type: String, required: true },
  certificationLevel: { type: String },
  issuanceDate: { type: Date, validate: validateIssuanceDate },
  expirationDate: { type: Date },
  certificateImage: { data: String, contentType: String },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
});

const Certificate = mongoose.model('certificates', certificateSchema);

export default Certificate;