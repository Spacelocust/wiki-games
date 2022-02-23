import express from 'express';

import auth from '../middleware/auth.js';
import { signin, signup, edit } from '../controllers/auth.js';

const router = express.Router();

const baseURL = '/users';

router.post(`${baseURL}/signin`, signin);
router.post(`${baseURL}/signup`, signup);
router.put(`${baseURL}/edit`, auth, edit);

export default router;
