import express from 'express';
import { getUser, registerUser } from '../controlers/users.js';
const router = express.Router();
router.post('/login', getUser);
router.post('/register', registerUser);
export default router;
//# sourceMappingURL=users-routes.js.map