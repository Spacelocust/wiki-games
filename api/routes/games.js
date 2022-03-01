import express from 'express';

const router = express.Router();

import {
    getGames,
    getGame,
    getGameMatches,
    getGamePastMatches,
    getGameRunningMatches,
    getGameUpcommingMatches
} from '../controllers/games.js';

const baseURL = '/games';

router.get(baseURL, getGames);

router.get(`${baseURL}/:id`, getGame);
router.get(`${baseURL}/:id/matchs`, getGameMatches);
router.get(`${baseURL}/:id/matchs/past/:page/:per_page`, getGamePastMatches);
router.get(`${baseURL}/:id/matchs/running/:page/:per_page`, getGameRunningMatches);
router.get(`${baseURL}/:id/matchs/upcoming/:page/:per_page`, getGameUpcommingMatches);

export default router;
