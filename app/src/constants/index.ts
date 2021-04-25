import { GET_PRODUCST, ADD_PRODUCT, ADD_MULTIPLE_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADED, DUMP_PRODUCTS } from './productActionTypes';
import { SHOW, HIDE } from './snackbarConstants';
import { LOGIN, LOGOUT } from './userActionTypes';
import { AddProductMessages, LoginMessages } from './snackbarConstants';

const productActionsTypes = { GET_PRODUCST, ADD_PRODUCT, ADD_MULTIPLE_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADED, DUMP_PRODUCTS };

const snackbarActionTypes = { SHOW, HIDE };

const userActionTypes = { LOGIN, LOGOUT };

export { AddProductMessages, LoginMessages };
export { productActionsTypes, snackbarActionTypes, userActionTypes };