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

export const fetchProducts = () => axios.get( '/products' );
export const postProduct = ( newProduct: Product ) =>
{
    return axios.post( `/products/add-product`, newProduct );
};