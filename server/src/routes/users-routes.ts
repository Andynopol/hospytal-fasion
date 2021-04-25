import express from 'express';
import { resourceLimits } from 'node:worker_threads';
import multer from 'multer';

import { getUser, registerUser } from '../controlers/users.js';

const router = express.Router();
const upload = multer();


//localhost:5000/user/login
router.post( '/login', upload.any(), getUser );

router.post( '/register', upload.any(), registerUser );

export default router;