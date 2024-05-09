import Certificate from '../models/certificate.js';

class CertificateRepository {
 static async findById(id) {
    return await Certificate.findById(id);
 }

 static async findByUserId(userId) {
    return await Certificate.find({ userId: userId });
 }

 static async findExpiredCertificates(userId) {
   const currentDate = new Date();
   return await Certificate.find({
      userId: userId,
      expirationDate: { $lt: currentDate }
   });
  }

 static async create(data) {
    const certificate = new Certificate(data);
    return await certificate.save();
 }

 static async updateById(id, updateData) {
    return await Certificate.findByIdAndUpdate(id, { $set: updateData }, { new: true });
 }

 static async deleteById(id) {
    return await Certificate.findByIdAndDelete(id);
 }
}

export default CertificateRepository;
