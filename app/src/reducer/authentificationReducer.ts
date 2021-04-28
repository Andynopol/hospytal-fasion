import { userActionTypes } from "../constants";

interface Action
{
    type: string,
    payload: Crediantials,
    isForced?: boolean;
}



interface Crediantials
{
    result: any,
    token: string,
}


const authentificationReducer = ( state: Crediantials = null, action: Action ) =>
{
    switch ( action.type )
    {
        case userActionTypes.LOGIN:
            localStorage.setItem( 'profile', JSON.stringify( { ...action?.payload } ) );
            state = action.payload.result;
            break;
        case userActionTypes.LOGOUT:
            state = null;
            localStorage.removeItem( 'profile' );
            break;
        case userActionTypes.RELOG:
            state = action.payload;
            break;
    }
    return state;
};

export { authentificationReducer };