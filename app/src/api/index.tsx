import axios from 'axios';

interface Product
{
    name: string;
    price: number;
    description?: string;
    details?: string;
    sale?: number;
    stock?: number;
    src: string;
}

const url = 'http://localhost:5000/products';


//get products
export const fetchProducts = () => axios.get( '/products' );

//send new product
export const postProduct = ( newProduct: Product ) => axios.post( `/products/add-product`, newProduct );