import express from 'express';
import multer from 'multer';

import { login, register } from '../controllers/users.js';

const router = express.Router();
const upload = multer();


//localhost:5000/user/login
router.post( '/login', upload.any(), login );

router.post( '/register', upload.any(), register );

export default router;