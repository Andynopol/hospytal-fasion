import express from 'express';

import { getProducts, addProduct, addProducts, updateProducts } from '../controlers/products.js';

const router = express.Router();


//localhost:5000/products
router.get( '/', getProducts );

router.post( '/add-product', addProduct );

router.post( '/add-products', addProducts );

router.patch( '/:id', updateProducts );

export default router;