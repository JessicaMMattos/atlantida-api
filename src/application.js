import express from 'express';
import cors from 'cors';
import connectToDB from '../config/dbConnect.js';
import routes from './routes/index.js';

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*'
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

connectToDB();

routes(app);

export default app;
