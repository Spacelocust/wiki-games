import express from 'express';
const router = express.Router();

import { getGames, getGame } from '../controllers/games.js';

const baseURL = '/games';

router.get(baseURL, getGames);
router.get(`${baseURL}/:id`, getGame);

export default router;
