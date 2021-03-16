import express from 'express';
import { getUser } from '../controlers/users.js';
const router = express.Router();
router.post('/', getUser);
export default router;
//# sourceMappingURL=users-routes.js.map