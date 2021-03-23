import { Dispatch } from 'react';
import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import AddProductMessages from '../api/constants';

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
        dispatch( loaded() );
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

        if ( data.status === "success" )
        {
            console.log( data.status );
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'success' } ) );
        }
        else
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'warning' } ) );
        }

        console.log( data );
        dispatch( dump() );
        dispatch( { type: "ADD-PRODUCT", payload: data } );
    } catch ( error )
    {
        if ( error.message === 'Request failed with status code 409' )
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.conflict, variant: 'error' } ) );
        } else
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: 'error' } ) );
        }
        console.log( error.message );
    }
};

const postProducts = ( products: Product[] ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.postProducts( products );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'success' } ) );

        }
        else
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'warning' } ) );
        }
        console.log( data );
        dispatch( dump() );
        dispatch( { type: "ADD-PRODUCTS", payload: data } );
    } catch ( error )
    {
        if ( error.message === 'Request failed with status code 409' )
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.conflict, variant: 'error' } ) );
        } else
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: 'error' } ) );
        }
        console.log( error.message );
    }
};

const updateProduct = ( id: 'string', product: Product ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.patchProduct( id, product );
        console.log( data );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'success' } ) );

        }
        else
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'warning' } ) );
        }
        dispatch( { type: 'UPDATE', payload: data } );
    } catch ( error )
    {
        dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: 'error' } ) );
        console.log( error );
    }
};

const deleteProduct = ( id: string ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.deleteProduct( id );
        console.log( data );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'success' } ) );

        }
        else
        {
            dispatch( snackbarActionManager.show( { message: data.message, variant: 'warning' } ) );
        }
        dispatch( { type: 'DELETE', payload: id } );
    } catch ( error )
    {
        console.log( error );
    }
};

const loaded = () =>
{
    return {
        type: 'LOADED',
    };
};

const dump = () =>
{
    return {
        type: "DUMP",
    };
};

const productsActions = { get: fetchProducts, post: postProduct, multipost: postProducts, update: updateProduct, delete: deleteProduct, load: loaded, dump: dump };

export { productsActions };