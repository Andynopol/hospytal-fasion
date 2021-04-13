import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';


export const store = createStore( reducer, compose( applyMiddleware( thunk ), ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ &&
    ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ ? ( window as any ).__REDUX_DEVTOOLS_EXTENSION__() : null ) );