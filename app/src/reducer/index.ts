import { combineReducers } from 'redux';
import { authentificationReducer } from './authentificationReducer';


const reducer = combineReducers( {
    isLogged: authentificationReducer
} );

export default reducer;