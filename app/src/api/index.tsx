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


// 'http://localhost:5000/products'; = proxy url


//get products
// export const fetchProducts = () => axios.get( '/products' );
export const fetchProducts = () => fetch( '/products' );

//get specific product
export const fetchSpecificProduct = ( id: string ) => axios.get( `/products/${ id }` );

//send new product
export const postProduct = ( newProduct: FormData ) => fetch( `/products/add-product`, { method: 'POST', body: newProduct } );

//send new products
export const postProducts = ( newProducts: Array<FormData> ) => axios.post( `/products/add-products`, newProducts );

//updete product

export const patchProduct = ( id: string, updatedProduct: any ) => axios.patch( `/products/${ id }`, updatedProduct );

export const deleteProduct = ( id: string ) => axios.delete( `/products/${ id }` );

export const addTestUser = () => axios.post( '/users', {} );