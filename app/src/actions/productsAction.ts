import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import { AddProductMessages, SnackBarVariants, snackbarActionTypes } from '../constants';
import { productActionsTypes } from '../constants';

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



//get request of products state
const fetchProducts = () => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.fetchProducts();
        dispatch( { type: productActionsTypes.GET_PRODUCST, payload: data.products } );
        dispatch( loaded() );
    } catch ( error )
    {
        dispatch( { type: productActionsTypes.GET_PRODUCST, payload: [] } );
        //signal that all products are loaded and no refresh is needed so that it shows the no items
        dispatch( loaded() );
        dispatch( snackbarActionManager.hide() );
        dispatch( snackbarActionManager.show( {
            message: "Connection failed", variant: SnackBarVariants.fail
        } ) );
        console.log( error );
    }


};

// same as fetchProducts without UI interaction
// used as a autorefresh when you have no signal
// ? THINK ABOUT USING IT AS A AUTORELOAD ENGINE
const bluntFetchProducts = () => async ( dispatch: any ) =>
{
    const { data } = await API.fetchProducts();
    dispatch( { type: productActionsTypes.GET_PRODUCST, payload: data.products } );
    dispatch( loaded() );
};


//single item post request for product items
const postProduct = ( product: FormData ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.postProduct( product );

        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.success } ) );
        }
        else
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.warning } ) );
        }

        //signal the app that not all products are loaded
        dispatch( dump() );
        dispatch( { type: productActionsTypes.ADD_PRODUCT, payload: data.product } );
        //refresh all products
        dispatch( fetchProducts() );
    } catch ( error )
    {
        if ( error.message === 'Request failed with status code 409' )
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.conflict, variant: SnackBarVariants.fail } ) );
        } else
        {
            dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: SnackBarVariants.fail } ) );
        }
        console.log( error.message );
    }
};


//multiple items post request for products state
const postProducts = ( products: Array<FormData> ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.postProducts( products );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.success } ) );

        }
        else
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.warning } ) );
        }
        //signal the app that not all products are loaded
        dispatch( dump() );
        dispatch( { type: productActionsTypes.ADD_MULTIPLE_PRODUCTS, payload: data } );
        //refresh all products
        dispatch( fetchProducts() );
    } catch ( error )
    {
        if ( error.message === 'Request failed with status code 409' )
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: AddProductMessages.conflict, variant: SnackBarVariants.fail } ) );
        } else
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: SnackBarVariants.fail } ) );
        }
        console.log( error.message );
    }
};


//singe item update request for products state
const updateProduct = ( id: 'string', product: FormData ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.patchProduct( id, product );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.success } ) );

        }
        else
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.warning } ) );
        }
        dispatch( { type: productActionsTypes.UPDATE_PRODUCT, payload: data.product } );
    } catch ( error )
    {
        dispatch( snackbarActionManager.hide() );
        dispatch( snackbarActionManager.show( { message: AddProductMessages.fail, variant: SnackBarVariants.fail } ) );
        console.log( error );
    }
    finally
    {
        dispatch( fetchProducts() );
    }
};

// single item delete for products state
const deleteProduct = ( id: string ) => async ( dispatch: any ) =>
{
    try
    {
        const { data } = await API.deleteProduct( id );
        if ( data.status === "success" )
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.success } ) );

        }
        else
        {
            dispatch( snackbarActionManager.hide() );
            dispatch( snackbarActionManager.show( { message: data.message, variant: SnackBarVariants.warning } ) );
        }
        dispatch( { type: productActionsTypes.DELETE_PRODUCT, payload: id } );
    } catch ( error )
    {
        console.log( error );
    }
};

//productsAreLoaded -> true
const loaded = () =>
{
    return {
        type: productActionsTypes.PRODUCTS_LOADED,
    };
};


//productsAreLoaded -> false
const dump = () =>
{
    return {
        type: productActionsTypes.DUMP_PRODUCTS,
    };
};

//TODO make routes for multiple products adding, updateing and deleting


/*
@productsActions = object that contains all redux actions that interacts with products
including API calls that return products objects
*/
const productsActions = { get: fetchProducts, post: postProduct, multipost: postProducts, update: updateProduct, delete: deleteProduct, load: loaded, dump: dump };

export { productsActions };