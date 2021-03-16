import express from 'express';
import { postRootController } from '../controlers/post-routes-controlers.js';
const router = express.Router();
router.get('/', postRootController);
export default router;
//# sourceMappingURL=post-routes.js.map