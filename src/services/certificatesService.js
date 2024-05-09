import CertificateRepository from '../repositories/certificateRepository.js';

class CertificatesService {
  static async findCertificateById(id) {
    return await CertificateRepository.findById(id);
 }

  static async findCertificateByUserId(userId) {
    return await CertificateRepository.findByUserId(userId);
  }

  static async findExpiredCertificates(userId) {
    return await CertificateRepository.findExpiredCertificates(userId);
  }

  static async createCertificate(certificateData) {
    return await CertificateRepository.create(certificateData);
  }

  static async updateCertificate(id, updateData) {
    return await CertificateRepository.updateById(id, updateData);
  }

  static async deleteCertificate(id) {
    return await CertificateRepository.deleteById(id);
  }
}

export default CertificatesService;
