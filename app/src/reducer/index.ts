import { combineReducers } from 'redux';
import { authentificationReducer } from './authentificationReducer';
import { productsReducer, productsAreLoadedReducer } from './productsReducer';


const reducer = combineReducers( {
    isLogged: authentificationReducer,
    products: productsReducer,
    productsAreLoaded: productsAreLoadedReducer
} );

export default reducer;