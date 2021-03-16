import express from 'express';
import { getProducts, addProduct } from '../controlers/products.js';
const router = express.Router();
router.get('/', getProducts);
router.post('/add-product', addProduct);
export default router;
//# sourceMappingURL=poroducts-routes.js.map