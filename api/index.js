import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import matchsRoutes from './routes/matchs.js';
import gamesRoutes from './routes/games.js';
import authRoutes from './routes/auth.js';

const app = express();

dotenv.config();
app.use(express.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
        preflightContinue: false,
        maxAge: 600,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

//Custom route
app.use('/api', matchsRoutes);
app.use('/api', gamesRoutes);
app.use('/api', authRoutes);

app.listen(5000, () => {
    console.log('server running');
});
