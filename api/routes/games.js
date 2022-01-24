import express from 'express';
const router = express.Router();

import { getGames } from '../controllers/games.js';

router.get('/games', getGames);

export default router;