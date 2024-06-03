import CertificateRepository from '../repositories/certificateRepository.js';
import logger from '../utils/logger.js';

class CertificatesService {
  static async findCertificateById(id) {
    logger.info('CertificatesService.findCertificateById');
    return await CertificateRepository.findById(id);
 }

  static async findCertificateByUserId(userId) {
    logger.info('CertificatesService.findCertificateByUserId');
    return await CertificateRepository.findByUserId(userId);
  }

  static async findExpiredCertificates(userId) {
    logger.info('CertificatesService.findExpiredCertificates');
    return await CertificateRepository.findExpiredCertificates(userId);
  }

  static async createCertificate(certificateData) {
    logger.info('CertificatesService.createCertificate');
    return await CertificateRepository.create(certificateData);
  }

  static async updateCertificate(id, updateData) {
    logger.info('CertificatesService.updateCertificate');
    return await CertificateRepository.updateById(id, updateData);
  }

  static async deleteCertificate(id) {
    logger.info('CertificatesService.deleteCertificate');
    return await CertificateRepository.deleteById(id);
  }
}

export default CertificatesService;
