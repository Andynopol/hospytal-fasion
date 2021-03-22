interface Action
{
    type: string,
    payload: any,
    isForced?: boolean;
}

const productsReducer = ( state: any[] = [], action: Action ) =>
{
    switch ( action.type )
    {
        case 'GET':
            return action.payload;
        case 'ADD-PRODUCT' || 'ADD-PRODUCTS':
            return [ ...state, action.payload ];
        default:
            return state;
    }
};

export { productsReducer };