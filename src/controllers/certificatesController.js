import CertificatesService from '../services/certificatesService.js';
import TokenService from '../services/tokenService.js';

class CertificatesController {
  static async findCertificateById(req, res) {
    try {
      const foundCertificate = await CertificatesService.findCertificateById(req.params.id);
      if (!foundCertificate) {
        return res.status(400).send({ message: 'Certificado não encontrado' });
      }

      return res.status(200).json(foundCertificate);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async findCertificateByToken(req, res) {
    try {
      const userId = await TokenService.returnUserIdToToken(req.headers.authorization);
      const certificates = await CertificatesService.findCertificateByUserId(userId);

      return res.status(200).send(certificates);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async findExpiredCertificates(req, res) {
    try {
       const userId = await TokenService.returnUserIdToToken(req.headers.authorization);
       const expiredCertificates = await CertificatesService.findExpiredCertificates(userId);

       res.status(200).json(expiredCertificates);
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
  }

  static async createCertificate(req, res) {
    try {
      req.body.userId = await TokenService.returnUserIdToToken(req.headers.authorization);
      const newCertificate = await CertificatesService.createCertificate(req.body);

      return res.status(201).set('Location', `/api/certificates/${newCertificate._id}`).json(newCertificate);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateCertificate(req, res) {
    try {
      const updatedCertificate = await CertificatesService.updateCertificate(req.params.id, req.body);
      if (!updatedCertificate) {
        return res.status(404).json({ message: 'Certificado não encontrado' });
      }

      return res.status(200).json(updatedCertificate);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteCertificate(req, res) {
    try {
      await CertificatesService.deleteCertificate(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CertificatesController;