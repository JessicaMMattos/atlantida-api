import express from 'express';
import cors from 'cors';
import connectToDB from '../config/dbConnect.js';
import routes from './routes/index.js';

const app = express();
app.use(cors())

connectToDB();

routes(app);

export default app;
