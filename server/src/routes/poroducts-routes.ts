import express from 'express';
import multer from 'multer';

import { getProducts, addProduct, addProducts, updateProducts, getSpecificProduct, deleteProduct } from '../controlers/products.js';

const router = express.Router();
const upload = multer();


//localhost:5000/products
router.get('/', getProducts);

router.get('/:id', getSpecificProduct);

router.post('/add-product', upload.any(), addProduct);

router.post('/add-products', upload.any(), addProducts);

router.patch('/:id', upload.any(), updateProducts);

router.delete('/:id', deleteProduct);

export default router;