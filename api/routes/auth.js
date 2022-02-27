import express from 'express';

import { auth, authRefreshToken } from '../middleware/auth.js';
import { signin, signup, edit, refreshToken, userByToken } from '../controllers/auth.js';

const router = express.Router();

const baseURL = '/users';

// users manage routes
router.post(`${baseURL}/signin`, signin);
router.post(`${baseURL}/signup`, signup);
router.put(`${baseURL}/edit`, auth, edit);

// token manage routes
router.post(`${baseURL}/token`, auth, userByToken);
router.post(`${baseURL}/refresh_token`, authRefreshToken, refreshToken);

export default router;
