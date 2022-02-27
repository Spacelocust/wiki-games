import express from 'express';

const router = express.Router();

import { auth } from '../middleware/auth.js';

import {
    getGames,
    getGame,
    getGameMatches,
    getGamePastMatches,
    getGameRunningMatches,
    getGameUpcommingMatches
} from '../controllers/games.js';

import { addMatchBet } from '../controllers/matchs.js';

const baseURL = '/games';

router.get(baseURL, getGames);
router.route(`${baseURL}/match_bets`)
    .all(auth)
    .get(getGameMatches)
    .post(addMatchBet);
router.get(`${baseURL}/:id`, getGame);
router.get(`${baseURL}/:id/matchs`, getGameMatches);
router.get(`${baseURL}/:id/matchs/past/:page/:per_page`, getGamePastMatches);
router.get(`${baseURL}/:id/matchs/running/:page/:per_page`, getGameRunningMatches);
router.get(`${baseURL}/:id/matchs/upcoming/:page/:per_page`, getGameUpcommingMatches);

export default router;
