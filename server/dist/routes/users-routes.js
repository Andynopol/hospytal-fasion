import express from 'express';
import multer from 'multer';
import { getUser, registerUser } from '../controlers/users.js';
const router = express.Router();
const upload = multer();
router.post('/login', upload.any(), getUser);
router.post('/register', upload.any(), registerUser);
export default router;
//# sourceMappingURL=users-routes.js.map