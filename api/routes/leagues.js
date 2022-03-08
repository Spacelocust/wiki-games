import express from 'express';
import { getLeague } from '../controllers/leagues.js';

const router = express.Router();

router.get('/leagues/:id', getLeague);

export default router;
