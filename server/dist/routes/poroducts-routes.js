import express from 'express';
import { getProducts, addProduct, addProducts, updateProducts, getSpecificProduct } from '../controlers/products.js';
const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getSpecificProduct);
router.post('/add-product', addProduct);
router.post('/add-products', addProducts);
router.patch('/:id', updateProducts);
export default router;
//# sourceMappingURL=poroducts-routes.js.map