import express from 'express';

import { signin, signup } from '../controllers/auth.js';

const router = express.Router();

const baseURL = '/users';

router.post(`${baseURL}/signin`, signin);
router.post(`${baseURL}/signup`, signup);

export default router;
