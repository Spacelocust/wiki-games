import express from 'express';

const router = express.Router();

import {
    getGames,
    getGame,
    getGameTeams,
    getGameMatchesByTime
} from '../controllers/games.js';

const baseURL = '/games';

router.get(baseURL, getGames);

router.get(`${baseURL}/:id`, getGame);
router.get(`${baseURL}/:id/teams`, getGameTeams);
router.get(`${baseURL}/:id/matchs/past/:page/:per_page`, (req, res) => getGameMatchesByTime('past', req, res));
router.get(`${baseURL}/:id/matchs/running/:page/:per_page`, (req, res) => getGameMatchesByTime('running', req, res));
router.get(`${baseURL}/:id/matchs/upcoming/:page/:per_page`, (req, res) => getGameMatchesByTime('upcoming', req, res));

export default router;
