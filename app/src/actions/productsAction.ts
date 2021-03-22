import { Dispatch } from 'react';
import * as API from '../api';

interface Action
{
    type: string;
    payload: [];
}

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

const fetchProducts = () => async ( dispatch: any ) =>
{

    try
    {
        const { data } = await API.fetchProducts();

        dispatch( { type: 'GET', payload: data.products } );
    } catch ( error )
    {
        console.log( error );
    }


};

const postProduct = ( product: Product ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.postProduct( product );
        console.log( data );

        dispatch( { type: "ADD-PRODUCT", payload: data } );
    } catch ( error )
    {
        console.log( error );
    }
};

const postProducts = ( products: Product[] ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.postProducts( products );
        console.log( data );

        dispatch( { type: "ADD-PRODUCTS", payload: data } );
    } catch ( error )
    {
        console.log( error );
    }
};

const updateProduct = ( id: 'string', product: Product ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.patchProduct( id, product );
        console.log( data );
        dispatch( { type: 'UPDATE', payload: data } );
    } catch ( error )
    {
        console.log( error );
    }
};

const deleteProduct = ( id: string ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.deleteProduct( id );
        console.log( data );
        if ( data.status !== 'success' )
        {
            alert( "Something whent whrong!" );
            return;
        }
        dispatch( { type: 'DELETE', payload: id } );
    } catch ( error )
    {
        console.log( error );
    }
};

const productsActions = { get: fetchProducts, post: postProduct, multipost: postProducts, update: updateProduct, delete: deleteProduct };

export { productsActions };