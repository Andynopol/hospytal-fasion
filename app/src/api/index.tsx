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


// 'http://localhost:5000'; = proxy url


const API = axios.create( { baseURL: 'http://localhost:5000' } );

API.interceptors.request.use( ( req ) =>
{
    if ( localStorage.getItem( 'profile' ) )
    {
        req.headers.Authorization = `Bearer ${ JSON.parse( localStorage.getItem( 'profile' ) ).token }`;
    }

    return req;
} );


//get products
// export const fetchProducts = () => axios.get( '/products' );
export const fetchProducts = () => API.get( '/products' );

//get specific product
export const fetchSpecificProduct = ( id: string ) => API.get( `/products/${ id }` );

//send new product
export const postProduct = ( newProduct: FormData ) => API.post( `/products/add-product`, newProduct );

//send new products
export const postProducts = ( newProducts: Array<FormData> ) => API.post( `/products/add-products`, newProducts );

//updete product
export const patchProduct = ( id: string, updatedProduct: any ) => API.post( `/products/${ id }`, updatedProduct );

//delete product
export const deleteProduct = ( id: string ) => API.delete( `/products/${ id }` );

//login user
export const login = ( credientials: FormData ) => API.post( '/user/login', credientials );

//register user
export const register = ( credientials: FormData ) => API.post( '/user/register', credientials );

