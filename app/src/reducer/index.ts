import { combineReducers } from 'redux';
import { authentificationReducer } from './authentificationReducer';
import { productsReducer, productsAreLoadedReducer } from './productsReducer';
import { snackbarReducer } from './snackbarReducers';

// @params: 
//@producst: an array state of products saved
//@productsAreLoaded: a boolean state that indicates if we have out products updated form the server or not
//@snackbar: an object state that contains weather is closed or open, the message and the type/variant

const reducer = combineReducers( {
    profile: authentificationReducer,
    products: productsReducer,
    productsAreLoaded: productsAreLoadedReducer,
    snackbar: snackbarReducer
} );

export default reducer;