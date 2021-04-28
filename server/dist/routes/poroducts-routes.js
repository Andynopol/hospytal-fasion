import express from 'express';
import multer from 'multer';
import { getProducts, addProduct, addProducts, updateProducts, getSpecificProduct, deleteProduct } from '../controllers/products.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
const upload = multer();
router.get('/', getProducts);
router.get('/:id', getSpecificProduct);
router.post('/add-product', auth, upload.any(), addProduct);
router.post('/add-products', auth, upload.any(), addProducts);
router.patch('/:id', auth, upload.any(), updateProducts);
router.delete('/:id', auth, deleteProduct);
export default router;
//# sourceMappingURL=poroducts-routes.js.map