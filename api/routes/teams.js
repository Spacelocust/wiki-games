import express from 'express';

const router = express.Router();

import { getTeam } from '../controllers/teams.js';

router.get('/teams/:id', getTeam);

export default router;
