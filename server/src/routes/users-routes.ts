import express from 'express';

import { getUser } from '../controlers/users.js';

const router = express.Router();


//localhost:5000/user
router.post( '/', getUser );

export default router;