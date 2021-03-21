import { Dispatch } from 'react';
import * as API from '../api';

interface Action
{
    type: string;
    payload: [];
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

const postProduct = ( product: any ) => async ( dispatch: any ) =>
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

const productsActions = { get: fetchProducts, post: postProduct };

export { productsActions };