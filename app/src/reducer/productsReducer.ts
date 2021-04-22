import { productActionsTypes } from '../constants';
interface Action
{
    type: string,
    payload: any,
    isForced?: boolean;
}



//@products state
const productsReducer = ( state: any[] = [], action: Action ) =>
{
    switch ( action.type )
    {
        case productActionsTypes.GET_PRODUCST:
            return action.payload;
        case productActionsTypes.ADD_PRODUCT || productActionsTypes.ADD_MULTIPLE_PRODUCTS:
            return [ ...state, action.payload ];
        case productActionsTypes.UPDATE_PRODUCT:
            console.log( action.payload );
            return state.map( ( product ) => product._id === action.payload._id ? action.payload : product );
        case productActionsTypes.DELETE_PRODUCT:
            return state.filter( ( product ) => product._id !== action.payload );
        default:
            return state;
    }
};


//@productsAreLoaded state
const productsAreLoadedReducer = ( state: boolean = false, action: Action ) =>
{
    switch ( action.type )
    {
        case productActionsTypes.PRODUCTS_LOADED:
            return true;
        case productActionsTypes.DUMP_PRODUCTS:
            return false;
        default:
            return state;
    }
};

export { productsReducer, productsAreLoadedReducer };