import Address from '../models/address.js';

class AddressRepository {
 static async findById(id) {
   return await Address.findById(id);
 }

 static async findAddressByUserId(userId) {
   return await Address.find({ userId: userId });
}

 static async create(data) {
    const address = new Address(data);
    return await address.save();
 }

 static async updateById(id, updateData) {
    return await Address.findByIdAndUpdate(id, { $set: updateData }, { new: true });
 }

 static async deleteById(id) {
    return await Address.findByIdAndDelete(id);
 }
}

export default AddressRepository;
