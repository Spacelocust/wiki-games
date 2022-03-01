import express from 'express';

const router = express.Router();

import { auth } from '../middleware/auth.js';
import { addBet, getMatchByBet } from '../controllers/matchs.js';

const baseURL = '/matchs';

router.post(`${baseURL}/match_bets`, auth, getMatchByBet)
router.post(`${baseURL}/match_bets/add`, auth, addBet)

export default router;
