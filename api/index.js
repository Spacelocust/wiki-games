import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import gamesRoutes from './routes/games.js';
import authRoutes from './routes/auth.js';

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        preflightContinue: false,
        methods: 'GET,PUT,POST,DELETE',
    })
);

app.options('*', cors());

//Custom route
app.use('/api', gamesRoutes);
app.use('/api', authRoutes);

app.listen(5000, () => {
    console.log('server running');
});
