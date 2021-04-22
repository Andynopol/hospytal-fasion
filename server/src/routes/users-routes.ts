import express from 'express';
import { resourceLimits } from 'node:worker_threads';

import { getUser, registerUser } from '../controlers/users.js';

const router = express.Router();


//localhost:5000/user/login
router.post( '/login', getUser );

router.post( '/register', registerUser );

export default router;