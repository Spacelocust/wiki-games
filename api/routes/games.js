import express from 'express';
const router = express.Router();

import { getGames, getGame, getGameMatches } from '../controllers/games.js';

const baseURL = '/games';

router.get(baseURL, getGames);
router.get(`${baseURL}/:id`, getGame);
router.get(`${baseURL}/:id/matches`, getGameMatches);

export default router;
