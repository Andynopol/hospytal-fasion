import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import AddProductMessages from '../api/constants';

interface Action {
    type: string;
    payload: [];
}

interface Product {
    name: string;
    price: number;
    description?: string;
    details?: string;
    sale?: number;
    stock?: number;
    src: string;
}



//get request of products state
const fetchProducts = () => async (dispatch: any) => {

    try {
        const response = await (await API.fetchProducts()).json();
        dispatch({ type: 'GET', payload: response.products });
        dispatch(loaded());
    } catch (error) {
        dispatch({ type: 'GET', payload: [] });
        //signal that all products are loaded and no refresh is needed so that it shows the no items
        dispatch(loaded());
        dispatch(snackbarActionManager.hide());
        dispatch(snackbarActionManager.show({ message: "Connection failed", variant: 'error' }));
        console.log(error);
    }


};

// same as fetchProducts without UI interaction
// used as a autorefresh when you have no signal
// ? THINK ABOUT USING IT AS A AUTORELOAD ENGINE
const bluntFetchProducts = () => async (dispatch: any) => {
    const response = await (await API.fetchProducts()).json();
    dispatch({ type: 'GET', payload: response.products });
    dispatch(loaded());
}


//single item post request for product items
const postProduct = (product: FormData) => async (dispatch: any) => {
    try {
        const response = await (await API.postProduct(product)).json();

        if (response.status === "success") {
            console.log(response.status);
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: response.message, variant: 'success' }));
        }
        else {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: response.message, variant: 'warning' }));
        }

        console.log(response);
        //signal the app that not all products are loaded
        dispatch(dump());
        dispatch({ type: "ADD-PRODUCT", payload: response.product });
        //refresh all products
        dispatch(fetchProducts());
    } catch (error) {
        if (error.message === 'Request failed with status code 409') {
            dispatch(snackbarActionManager.show({ message: AddProductMessages.conflict, variant: 'error' }));
        } else {
            dispatch(snackbarActionManager.show({ message: AddProductMessages.fail, variant: 'error' }));
        }
        console.log(error.message);
    }
};


//multiple items post request for products state
const postProducts = (products: Array<FormData>) => async (dispatch: any) => {
    try {
        const { data } = await API.postProducts(products);
        if (data.status === "success") {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: data.message, variant: 'success' }));

        }
        else {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: data.message, variant: 'warning' }));
        }
        console.log(data);
        //signal the app that not all products are loaded
        dispatch(dump());
        dispatch({ type: "ADD-PRODUCTS", payload: data });
        //refresh all products
        dispatch(fetchProducts());
    } catch (error) {
        if (error.message === 'Request failed with status code 409') {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: AddProductMessages.conflict, variant: 'error' }));
        } else {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: AddProductMessages.fail, variant: 'error' }));
        }
        console.log(error.message);
    }
};


//singe item update request for products state
const updateProduct = (id: 'string', product: FormData) => async (dispatch: any) => {
    console.log(product);
    try {
        const response = await (await API.patchProduct(id, product)).json();
        console.log(response);
        if (response.status === "success") {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: response.message, variant: 'success' }));

        }
        else {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: response.message, variant: 'warning' }));
        }
        dispatch({ type: 'UPDATE', payload: response.product });
    } catch (error) {
        dispatch(snackbarActionManager.hide());
        dispatch(snackbarActionManager.show({ message: AddProductMessages.fail, variant: 'error' }));
        console.log(error);
    }
    finally {
        dispatch(fetchProducts());
    }
};

// single item delete for products state
const deleteProduct = (id: string) => async (dispatch: any) => {
    try {
        const { data } = await API.deleteProduct(id);
        console.log(data);
        if (data.status === "success") {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: data.message, variant: 'success' }));

        }
        else {
            dispatch(snackbarActionManager.hide());
            dispatch(snackbarActionManager.show({ message: data.message, variant: 'warning' }));
        }
        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
};

//productsAreLoaded -> true
const loaded = () => {
    return {
        type: 'LOADED',
    };
};


//productsAreLoaded -> false
const dump = () => {
    return {
        type: "DUMP",
    };
};


/*
@productsActions = object that contains all redux actions that interacts with products
including API calls that return products objects
*/
const productsActions = { get: fetchProducts, post: postProduct, multipost: postProducts, update: updateProduct, delete: deleteProduct, load: loaded, dump: dump };

export { productsActions };