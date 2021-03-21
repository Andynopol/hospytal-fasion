import axios from 'axios';

interface Product
{
    name: string;
    price: number;
    src: string;
    promotion?: number;
    piecesLeft?: number;
    description?: string;
    details?: string;
}

const url = 'http://localhost:5000/products';

export const fetchProducts = () => axios.get( 'http://localhost:5000/products' );
export const postProduct = ( newProduct: any ) =>
{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( newProduct )
    };
    return axios.post( `http://localhost:5000/products/add-product`, options );
};