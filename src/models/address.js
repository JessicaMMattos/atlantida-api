import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  complement: { type: String },
  postalCode: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

const Address = mongoose.model('addresses', addressSchema);

export default Address;
