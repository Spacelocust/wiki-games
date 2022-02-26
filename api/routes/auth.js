import express from 'express';

import auth from '../middleware/auth.js';
import { signin, signup, edit, refreshToken } from '../controllers/auth.js';

const router = express.Router();

const baseURL = '/users';

router.post(`${baseURL}/signin`, signin);
router.post(`${baseURL}/signup`, signup);
router.post(`${baseURL}/refresh`, auth, refreshToken);
router.put(`${baseURL}/edit`, auth, edit);

export default router;
