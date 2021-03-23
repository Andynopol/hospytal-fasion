import { combineReducers } from 'redux';
import { authentificationReducer } from './authentificationReducer';
import { productsReducer, productsAreLoadedReducer } from './productsReducer';
import { snackbarReducer } from './snackbarReducers';


const reducer = combineReducers( {
    isLogged: authentificationReducer,
    products: productsReducer,
    productsAreLoaded: productsAreLoadedReducer,
    snackbar: snackbarReducer
} );

export default reducer;