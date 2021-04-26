import express from 'express';
import multer from 'multer';

import { login, registerUser } from '../controlers/users.js';

const router = express.Router();
const upload = multer();


//localhost:5000/user/login
router.post( '/login', upload.any(), login );

router.post( '/register', upload.any(), registerUser );

export default router;