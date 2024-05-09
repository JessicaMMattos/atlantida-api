import express from "express";
import CertificatesController from '../controllers/certificatesController.js';
import { bearer } from '../middleware/autenticationMiddleware.js';

const certificatesRoutes = express.Router();

certificatesRoutes
  .get('/api/certificates/:id', CertificatesController.findCertificateById)
  .get('/api/certificates', bearer, CertificatesController.findCertificateByToken)
  .post('/api/certificates/expired', bearer, CertificatesController.findExpiredCertificates)
  .post('/api/certificates', bearer, CertificatesController.createCertificate)
  .put('/api/certificates/:id', bearer, CertificatesController.updateCertificate)
  .delete('/api/certificates/:id', bearer, CertificatesController.deleteCertificate);

export default certificatesRoutes;
