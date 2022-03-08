import express from 'express';

const router = express.Router();

import { auth } from '../middleware/auth.js';
import { getTeam, deleteTeamFavorite, addTeamFavorite } from '../controllers/teams.js';

router.get('/teams/:id', getTeam);
router.post('/teams/favorite/add', auth, addTeamFavorite);
router.delete('/teams/favorite/:id', auth, deleteTeamFavorite);

export default router;
