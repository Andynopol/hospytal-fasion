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
        case 'GET':
            return action.payload;
        case 'ADD-PRODUCT' || 'ADD-PRODUCTS':
            return [ ...state, action.payload ];
        case 'UPDATE':
            console.log( action.payload );
            return state.map( ( product ) => product._id === action.payload._id ? action.payload : product );
        case 'DELETE':
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
        case "LOADED":
            return true;
        case "DUMP":
            return false;
        default:
            return state;
    }
};

export { productsReducer, productsAreLoadedReducer };