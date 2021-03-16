import express from 'express';

import { getProducts, addProduct } from '../controlers/products.js';

const router = express.Router();


//localhost:5000/products
router.get( '/', getProducts );

router.post( '/add-product', addProduct );

export default router;