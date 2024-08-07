import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

import usersRoutes from './usersRoutes.js';
import adressesRoutes from './adressesRoutes.js';
import certificatesRoutes from './certificatesRoutes.js';
import diveLogsRoutes from './diveLogsRoutes.js';
import diveStatisticsRoutes from './diveStatisticsRoutes.js';
import divingSpotRoutes from './divingSpotRoutes.js';
import commentRoutes from './commentRoutes.js';

const file = fs.readFileSync('src/swagger/atlantida-api.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const routes = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.route('/').get((_, res) => {
    res.status(200).send({ titulo: 'Atlantida API' });
  });

  app.use(express.json());

  app.use(adressesRoutes, usersRoutes, certificatesRoutes, diveLogsRoutes, diveStatisticsRoutes, divingSpotRoutes, commentRoutes);
};

export default routes;