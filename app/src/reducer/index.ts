import { combineReducers } from 'redux';
import { authentificationReducer } from './authentificationReducer';
import { productsReducer } from './productsReducer';


const reducer = combineReducers( {
    isLogged: authentificationReducer,
    products: productsReducer
} );

export default reducer;