import { GET_PRODUCST, ADD_PRODUCT, ADD_MULTIPLE_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADED, DUMP_PRODUCTS } from './productActionTypes';
import { SHOW, HIDE, AddProductMessages, LoginMessages, SnackBarVariants } from './snackbarConstants';
import { LOGIN, LOGOUT } from './userActionTypes';
import { NoSrcAlert } from './AlertMessages';
import { FieldSelector } from './FieldSelectors';
import { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_REMEMBER, REGISTER_FIRST_NAME, REGISTER_LAST_NAME, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_RE_PASSWORD } from './AuthFields';
import { MAIL_FORMAT } from './StringFormats';

const productActionsTypes = { GET_PRODUCST, ADD_PRODUCT, ADD_MULTIPLE_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADED, DUMP_PRODUCTS };

const snackbarActionTypes = { SHOW, HIDE };

const userActionTypes = { LOGIN, LOGOUT };

export { AddProductMessages, LoginMessages, SnackBarVariants };
export { productActionsTypes, snackbarActionTypes, userActionTypes };

export { NoSrcAlert };
export { FieldSelector };
export { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_REMEMBER, REGISTER_FIRST_NAME, REGISTER_LAST_NAME, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_RE_PASSWORD };
export { MAIL_FORMAT };