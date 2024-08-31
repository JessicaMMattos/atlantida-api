import express from 'express';
import cors from 'cors';
import connectToDB from '../config/dbConnect.js';
import routes from './routes/index.js';

const app = express();
app.use(cors())
app.use(express.json({ limit: '100000000000mb' }));
app.use(express.urlencoded({ limit: '100000000000mb', extended: true }));

connectToDB();

routes(app);

export default app;
