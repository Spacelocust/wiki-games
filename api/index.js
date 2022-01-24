import express from 'express';
import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';
import dotenv from 'dotenv';

import gamesRoutes from './routes/games.js';

const router = jsonServer.router('api-json/db.json');
const app = express();
dotenv.config();

app.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);

app.db = router.db;

//Middleware auth
app.use(auth);

app.use(jsonServer.bodyParser);

//Custom route
app.use('/api', gamesRoutes);
app.use('/api', router);
app.use('/api', jsonServer.rewriter('api-json/routes.json'));

app.listen(5000, () => {
    console.log('server running');
});